const { solve } = require('./lbm.js');
const NX = 120, NY = 50, top = 10, bot = 30, H = bot - top, Umax = 0.08, nu = 0.04;
const solid = new Uint8Array(NX * NY);
for (let y = 0; y < NY; y++) for (let x = 0; x < NX; x++) if (!(y > top && y < bot)) solid[y * NX + x] = 1;
const inlet = (y) => { if (y <= top || y >= bot) return 0; const s = (y - top) / H; return 4 * Umax * s * (1 - s); };
const r = solve({ NX, NY, solid, inlet, nu, farField: 0, steps: 8000, label: 'dbg' });
const yc = 20;
console.log('centreline ux/Umax:', [0, 1, 2, 5, 10, 30, 60, 90, 118, 119].map(x => (r.ux[yc * NX + x] / Umax).toFixed(2)).join(' '));
// compare the developed profile at x = 90 with the exact Poiseuille profile (walls half-way, at 10.5 and 29.5), same flow rate
let q = 0, prof = []; for (let y = top + 1; y < bot; y++) { q += r.ux[y * NX + 90]; prof.push(r.ux[y * NX + 90]); }
const a = top + .5, b = bot - .5, Hh = b - a; let qa = 0, ana = []; for (let y = top + 1; y < bot; y++) { const s = (y - a) / Hh; ana.push(s * (1 - s)); qa += s * (1 - s); }
const k = q / qa; let err = 0, mx = 0; prof.forEach((u, i) => { err = Math.max(err, Math.abs(u - k * ana[i])); mx = Math.max(mx, u); });
console.log('max deviation from Poiseuille =', (err / mx * 100).toFixed(2), '% of peak; inlet flow rate vs outlet:', (q / [...Array(bot - top - 1)].reduce((s, _, i) => s + r.ux[(top + 1 + i) * NX + 2], 0)).toFixed(3));
