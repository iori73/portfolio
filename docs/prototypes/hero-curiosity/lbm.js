// Lattice Boltzmann (D2Q9, BGK) solver for the two steady flows used in the hero prototypes.
// Run: node lbm.js  -> writes lbm-fields.json (velocity fields, downsampled x2, quantised to Int16, base64)
const fs = require('fs');
const ex = [0, 1, 0, -1, 0, 1, -1, -1, 1], ey = [0, 0, 1, 0, -1, 1, 1, -1, -1];
const W = [4 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 36, 1 / 36, 1 / 36, 1 / 36], OPP = [0, 3, 4, 1, 2, 7, 8, 5, 6];

function solve({ NX, NY, solid, inlet, nu, farField, steps, label }) {
  const N = NX * NY, tau = 3 * nu + 0.5, om = 1 / tau;
  let f = new Float64Array(9 * N), g = new Float64Array(9 * N);
  const ux = new Float64Array(N), uy = new Float64Array(N), rho = new Float64Array(N);
  const feq = (k, r, u, v) => { const eu = ex[k] * u + ey[k] * v, uu = u * u + v * v; return W[k] * r * (1 + 3 * eu + 4.5 * eu * eu - 1.5 * uu); };
  for (let c = 0; c < N; c++) for (let k = 0; k < 9; k++) f[9 * c + k] = feq(k, 1, 0, 0);
  let lastRes = 1, prev = new Float64Array(N);
  for (let s = 0; s < steps; s++) {
    const ramp = Math.min(1, s / 2000);
    // collide
    for (let c = 0; c < N; c++) {
      if (solid[c]) continue;
      let r = 0, u = 0, v = 0; const o = 9 * c;
      for (let k = 0; k < 9; k++) { const fk = f[o + k]; r += fk; u += fk * ex[k]; v += fk * ey[k]; }
      u /= r; v /= r; rho[c] = r; ux[c] = u; uy[c] = v;
      for (let k = 0; k < 9; k++) f[o + k] += om * (feq(k, r, u, v) - f[o + k]);
    }
    // stream with full-way bounce-back on solid cells
    for (let y = 0; y < NY; y++) for (let x = 0; x < NX; x++) {
      const c = y * NX + x; if (solid[c]) continue;
      for (let k = 0; k < 9; k++) {
        const X = x + ex[k], Y = y + ey[k];
        if (X < 0 || X >= NX || Y < 0 || Y >= NY) continue;   // open boundaries are set below
        const d = Y * NX + X;
        if (solid[d]) g[9 * c + OPP[k]] = f[9 * c + k]; else g[9 * d + k] = f[9 * c + k];
      }
    }
    // inlet (left): prescribed velocity, density taken from the neighbour;
    // outlet (right): fixed density (rho = 1), velocity taken from the neighbour. Equilibrium boundaries.
    for (let y = 0; y < NY; y++) {
      const c0 = y * NX, c1 = y * NX + 1, cN = y * NX + NX - 1, cM = y * NX + NX - 2;
      if (!solid[c0]) { const u = inlet(y) * ramp, r1 = rho[c1] || 1; for (let k = 0; k < 9; k++) g[9 * c0 + k] = feq(k, r1, u, 0); }
      if (!solid[cN]) for (let k = 0; k < 9; k++) g[9 * cN + k] = feq(k, 1, ux[cM], uy[cM]);
    }
    // far-field rows (top and bottom), when the domain is not walled
    if (farField) for (const y of [0, NY - 1]) for (let x = 0; x < NX; x++) { const c = y * NX + x; if (!solid[c]) { const u = farField * ramp; for (let k = 0; k < 9; k++) g[9 * c + k] = feq(k, 1, u, 0); } }
    [f, g] = [g, f];
    if (s % 1000 === 999) {
      let num = 0, den = 0; for (let c = 0; c < N; c++) { if (solid[c]) continue; const sp = Math.hypot(ux[c], uy[c]); num += Math.abs(sp - prev[c]); den += sp; prev[c] = sp; }
      lastRes = num / den;
      if (s % 5000 === 4999) console.log(`${label} step ${s + 1} residual ${lastRes.toExponential(2)}`);
      if (s > 6000 && lastRes < 2e-6) { console.log(`${label} converged at step ${s + 1}`); break; }
    }
  }
  return { ux, uy, tau, lastRes };
}

// downsample x2 (and optionally keep only rows y0 .. y0+rows of the computed domain)
function pack(NX, NY, solid, ux, uy, Uref, y0 = 0, rows = NY) {
  const nx = NX / 2, ny = Math.floor(rows / 2), a = new Int16Array(nx * ny * 2), m = new Uint8Array(nx * ny);
  for (let y = 0; y < ny; y++) for (let x = 0; x < nx; x++) {
    let su = 0, sv = 0, n = 0, sol = 0;
    for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) { const c = (y0 + 2 * y + dy) * NX + 2 * x + dx; if (solid[c]) { sol++; continue; } su += ux[c]; sv += uy[c]; n++; }
    const i = y * nx + x; m[i] = sol >= 2 ? 1 : 0;
    a[2 * i] = n ? Math.round(su / n / Uref * 12000) : 0; a[2 * i + 1] = n ? Math.round(sv / n / Uref * 12000) : 0;
  }
  return { nx, ny, Uref, vel: Buffer.from(a.buffer).toString('base64'), mask: Buffer.from(m.buffer).toString('base64') };
}

module.exports = { solve, pack };

// 諸行無常, second geometry: a river with gently waving banks and a round cove below the lower bank (the shape of the first sketch)
function river() {
  const NX = 360, NY = 146, TAU = Math.PI * 2, Umax = 0.08, nu = 0.04;
  const top = (x) => NY * .3 + Math.sin(x / NX * TAU * .8) * NY * .05, bot = (x) => NY * .74 + Math.sin(x / NX * TAU * .8 + 1) * NY * .04;
  const ccx = NX * .62, ccy = bot(ccx) + NY * .06, cr = NY * .14;
  const solid = new Uint8Array(NX * NY);
  for (let y = 0; y < NY; y++) for (let x = 0; x < NX; x++) {
    const inChannel = y > top(x) && y < bot(x), inCove = Math.hypot(x - ccx, y - ccy) <= cr;
    if (!(inChannel || inCove)) solid[y * NX + x] = 1;
  }
  const t0 = top(0), b0 = bot(0), H = b0 - t0;
  const inlet = (y) => { if (y <= t0 || y >= b0) return 0; const s = (y - t0) / H; return 4 * Umax * s * (1 - s); };
  const r = solve({ NX, NY, solid, inlet, nu, farField: 0, steps: 90000, label: 'river' });
  let minU = 0; for (let y = 0; y < NY; y++) for (let x = 0; x < NX; x++) { const c = y * NX + x; if (!solid[c] && Math.hypot(x - ccx, y - ccy) < cr && y > bot(x)) minU = Math.min(minU, r.ux[c]); }
  const Re = Math.round(Umax * H / nu);
  console.log(`river Re=${Re} tau=${r.tau.toFixed(3)} residual ${r.lastRes.toExponential(2)} strongest reverse flow in the cove = ${(minU / Umax).toFixed(3)} Umax`);
  return Object.assign(pack(NX, NY, solid, r.ux, r.uy, Umax), { Re, tau: +r.tau.toFixed(3), residual: r.lastRes, reverse: +(minU / Umax).toFixed(3) });
}

if (require.main === module && process.argv[2] === 'river') {
  const file = __dirname + '/lbm-fields.json', out = JSON.parse(fs.readFileSync(file, 'utf8'));
  out.river = river();
  fs.writeFileSync(file, JSON.stringify(out));
  console.log('added river to', file);
} else if (require.main === module) {
const out = {};

// 空: flow past a circular cylinder at Re = 40 (steady: a still pair of vortices behind it)
{
  // computed in a taller domain (blockage D/NY = 10 %) so the walls barely squeeze the wake; the middle 146 rows are shown
  const NX = 360, NY = 240, D = 24, cx = 80, cy = 120, U = 0.06, Re = 40, nu = U * D / Re, SHOW = 146, Y0 = cy - SHOW / 2;
  const solid = new Uint8Array(NX * NY);
  for (let y = 0; y < NY; y++) for (let x = 0; x < NX; x++) if (Math.hypot(x - cx, y - cy) <= D / 2) solid[y * NX + x] = 1;
  const r = solve({ NX, NY, solid, inlet: () => U, nu, farField: U, steps: 60000, label: 'cylinder' });
  // recirculation length: where ux turns positive again along the centreline behind the cylinder
  let L = 0; for (let x = cx + D / 2 + 1; x < NX; x++) { if (r.ux[cy * NX + x] < 0) L = x - (cx + D / 2); else if (L) break; }
  console.log(`cylinder Re=${Re} tau=${r.tau.toFixed(3)} recirculation length = ${(L / D).toFixed(2)} D (literature at Re=40: about 2.1–2.3 D)`);
  out.cylinder = Object.assign(pack(NX, NY, solid, r.ux, r.uy, U, Y0, SHOW), { Re, R: D / 4, cx: cx / 2, cy: (cy - Y0) / 2, Lr: +(L / D).toFixed(2), tau: +r.tau.toFixed(3), residual: r.lastRes, blockage: D / NY });
}

// 諸行無常: a channel with a side cove; the eddy in the cove is the result of the calculation
{
  const NX = 360, NY = 146, top = 30, bot = 90, H = bot - top, Umax = 0.08, nu = 0.04, coveX = 200, coveA = 46, coveB = 42;
  const solid = new Uint8Array(NX * NY);
  for (let y = 0; y < NY; y++) for (let x = 0; x < NX; x++) {
    const inChannel = y > top && y < bot;
    const inCove = y >= bot - 1 && ((x - coveX) / coveA) ** 2 + ((y - bot) / coveB) ** 2 <= 1;
    if (!(inChannel || inCove)) solid[y * NX + x] = 1;
  }
  const inlet = (y) => { if (y <= top || y >= bot) return 0; const s = (y - top) / H; return 4 * Umax * s * (1 - s); };
  const r = solve({ NX, NY, solid, inlet, nu, farField: 0, steps: 90000, label: 'cove' });
  let minU = 0; for (let y = bot; y < bot + coveB; y++) for (let x = coveX - coveA; x < coveX + coveA; x++) { const c = y * NX + x; if (!solid[c]) minU = Math.min(minU, r.ux[c]); }
  const Re = Umax * H / nu;
  console.log(`cove Re=${Re} tau=${r.tau.toFixed(3)} strongest reverse flow in the cove = ${(minU / Umax).toFixed(3)} Umax (negative means an eddy)`);
  out.cove = Object.assign(pack(NX, NY, solid, r.ux, r.uy, Umax), { Re, top: top / 2, bot: bot / 2, coveX: coveX / 2, coveA: coveA / 2, coveB: coveB / 2, tau: +r.tau.toFixed(3), residual: r.lastRes, reverse: +(minU / Umax).toFixed(3) });
}

fs.writeFileSync(__dirname + '/lbm-fields.json', JSON.stringify(out));
console.log('wrote', (fs.statSync(__dirname + '/lbm-fields.json').size / 1024).toFixed(0), 'KB');
}
