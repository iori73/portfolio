// Karesansui garden generator, shared by the HTML prototype and the Figma build.
// buildGarden() -> { W, H, groups: [{ key, jp, en, motifJp, motifEn, hit:{cx,cy,rx,ry}|null, items:[el] }] }
// el: { d, tone, w, fill, stroke:false?, dash:true?, anim:{ type:'draw'|'fade'|'settle'|'leaf', d, dur } }
function buildGarden() {
  var W = 1200, H = 380, TAU = Math.PI * 2;
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var R = rng(1125);
  var f1 = function (v) { return Math.round(v * 10) / 10; };
  function path(p, closed) {
    var d = 'M' + f1(p[0][0]) + ' ' + f1(p[0][1]);
    for (var i = 1; i < p.length; i++) d += 'L' + f1(p[i][0]) + ' ' + f1(p[i][1]);
    return closed ? d + 'Z' : d;
  }
  function shapeFn() { var p1 = R() * TAU, p2 = R() * TAU, p3 = R() * TAU; return function (a, k) { return 1 + k * (0.11 * Math.sin(2 * a + p1) + 0.06 * Math.sin(3 * a + p2) + 0.035 * Math.sin(5 * a + p3)); }; }
  function sgnPow(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
  // A stone: n=2 is a natural ellipse-like stone, n=4 a squarish cut stone.
  function stone(cx, cy, rx, ry, n, rough, rings) { return { cx: cx, cy: cy, rx: rx, ry: ry, n: n, rough: rough, rings: rings, sh: shapeFn(), dmax: rings[rings.length - 1] }; }
  function pt(s, a, d) {
    var k = s.rough * Math.max(0.22, 1 - d / 70);
    var n = 2 + (s.n - 2) * Math.max(0.35, 1 - d / 60), e = 2 / n;
    var ux = sgnPow(Math.cos(a), e), uy = sgnPow(Math.sin(a), e), sh = s.sh(a, k);
    var flat = uy > 0 ? 1 - 0.22 * Math.max(0, 1 - d / 40) : 1;
    return [s.cx + (s.rx * sh + d) * ux, s.cy + (s.ry * sh + d) * uy * flat];
  }
  function inside(s, x, y, d) {
    var a = Math.atan2((y - s.cy) / (s.ry + d), (x - s.cx) / (s.rx + d));
    var p = pt(s, a, d);
    return Math.hypot(x - s.cx, y - s.cy) < Math.hypot(p[0] - s.cx, p[1] - s.cy);
  }
  function split(pts, keep, minLen) {
    var segs = [], cur = [];
    pts.forEach(function (p) { if (keep(p)) cur.push(p); else { if (cur.length > 1) segs.push(cur); cur = []; } });
    if (cur.length > 1) segs.push(cur);
    return segs.filter(function (s) { var L = 0; for (var i = 1; i < s.length; i++) L += Math.hypot(s[i][0] - s[i - 1][0], s[i][1] - s[i - 1][1]); return L >= minLen; });
  }
  function ellE(x, y, cx, cy, rx, ry) { var dx = (x - cx) / rx, dy = (y - cy) / ry; return dx * dx + dy * dy; }

  // ---- layout: headline sits upper-left, so the garden's weight goes right of centre ----
  var A = stone(760, 172, 66, 42, 2, 1, [12, 21, 30, 39, 48, 57]);   // main stone: podcast
  var B = stone(886, 242, 20, 13, 2, 1, [9, 17, 25]);                 // its companion
  var C = stone(420, 108, 30, 23, 4, 0.35, [10, 19, 28, 37]);         // cut stone: Figma plugins
  var stones = [A, B, C];
  var SEI = { cx: 1062, cy: 336, rx: 150, ry: 64 };                     // seigaiha patch
  var MOSS = { a0: Math.PI * 0.58, a1: Math.PI * 1.12, d0: 3, d1: 25 }; // crescent at A's foot

  var groups = [];

  // ---- 1. raked sand (straight lines), drawn left to right like a rake moving ----
  (function () {
    var items = [], rows = 33;
    for (var i = 0; i < rows; i++) {
      var y0 = 12 + i * 11 + (R() - 0.5) * 1, edge = Math.min(i, rows - 1 - i), op = f1(Math.min(1, 0.35 + edge * 0.16));
      var xs = 10 + R() * 80 + (edge < 4 ? (4 - edge) * 40 * R() : 0), xe = W - 10 - R() * 100 - (edge < 4 ? (4 - edge) * 45 * R() : 0);
      var ph1 = R() * TAU, ph2 = R() * TAU, pts = [];
      for (var x = xs; x <= xe; x += 4) pts.push([x, y0 + 0.6 * Math.sin(x * 0.011 + ph1) + 0.3 * Math.sin(x * 0.037 + ph2)]);
      split(pts, function (p) {
        if (stones.some(function (s) { return inside(s, p[0], p[1], s.dmax + 5); })) return false;
        return ellE(p[0], p[1], SEI.cx, SEI.cy, SEI.rx, SEI.ry) > 0.55;
      }, 10).forEach(function (seg) {
        var x0 = seg[0][0], x1 = seg[seg.length - 1][0];
        items.push({ d: path(seg), tone: 'rake', w: 0.7, op: op, anim: { type: 'draw', d: f1(0.1 + i * 0.022 + x0 / W * 2.2), dur: f1(Math.max(0.2, (x1 - x0) / W * 2.2)) } });
      });
    }
    groups.push({ key: 'sand', hit: null, items: items });
  })();

  // ---- 2. 浮世絵・文様 → seigaiha raked into the sand at the lower right ----
  (function () {
    var items = [], r0 = 18;
    for (var j = 0; j < 15; j++) for (var i = -1; i < 10; i++) {
      var cx = SEI.cx - SEI.rx + i * 2 * r0 + (j % 2 ? r0 : 0), cy = SEI.cy - SEI.ry + 4 + j * r0 * 0.5;
      if (cy > H - 1 || cx > W - 2) continue;
      var e = ellE(cx, cy, SEI.cx, SEI.cy, SEI.rx, SEI.ry);
      if (e > 1 || (e > 0.6 && R() < 0.5)) continue;
      var dl = f1(1.0 + e * 1.3 + j * 0.02);
      var semi = []; for (var q = 0; q <= 24; q++) { var a = Math.PI + Math.PI * q / 24; semi.push([cx + r0 * 0.99 * Math.cos(a), cy + r0 * 0.99 * Math.sin(a)]); }
      items.push({ d: path(semi, true), fill: 'bg', stroke: false, anim: { type: 'fade', d: dl, dur: 1.2 } });
      [1, 0.55].forEach(function (k) {
        var arc = []; for (var q2 = 0; q2 <= 20; q2++) { var a2 = Math.PI + Math.PI * q2 / 20; arc.push([cx + r0 * k * Math.cos(a2), cy + r0 * k * Math.sin(a2)]); }
        items.push({ d: path(arc), tone: 'ripple', w: 0.75, op: 0.75, anim: { type: 'fade', d: dl, dur: 1.2 } });
      });
    }
    groups.push({ key: 'ukiyoe', jp: '浮世絵・文様', en: 'Ukiyo-e & patterns', motifJp: '砂に引いた青海波。浮世絵にも文様にも出てくる波', motifEn: 'Seigaiha raked into the sand, the wave found in both ukiyo-e and traditional patterns', hit: { cx: SEI.cx, cy: SEI.cy, rx: SEI.rx * 0.9, ry: SEI.ry * 0.9 }, items: items });
  })();

  function ringItems(s, base, skipMoss) {
    var items = [];
    s.rings.forEach(function (d, idx) {
      var pts = []; for (var q = 0; q <= 120; q++) { var a = q / 120 * TAU; var p = pt(s, a, d); p.a = a; pts.push(p); }
      split(pts, function (p) {
        if (stones.some(function (o) { return o !== s && inside(o, p[0], p[1], o.dmax + 3); })) return false;
        if (skipMoss && d <= MOSS.d1 + 2 && p.a > MOSS.a0 - 0.06 && p.a < MOSS.a1 + 0.06) return false;
        return true;
      }, 6).forEach(function (seg) { items.push({ d: path(seg), tone: 'ripple', w: 0.85, anim: { type: 'draw', d: f1(base + idx * 0.16), dur: 1.3 } }); });
    });
    return items;
  }
  function stoneItems(s, dl) {
    var items = [], base = [], deep = [];
    for (var q = 0; q < 72; q++) { var a = q / 72 * TAU, p = pt(s, a, 0); base.push(p); deep.push([s.cx + s.rx * 0.12 + (p[0] - s.cx) * 0.76, s.cy + s.ry * 0.14 + (p[1] - s.cy) * 0.76]); }
    var an = { type: 'settle', d: dl, dur: 1.4 };
    items.push({ d: path(base, true), fill: 'stone', stroke: false, anim: an });
    items.push({ d: path(deep, true), fill: 'stoneDeep', stroke: false, anim: an });
    var a0 = R() * TAU, out = []; for (var q2 = 0; q2 <= 64; q2++) out.push(pt(s, a0 + (TAU - 0.6) * q2 / 64, 0));
    items.push({ d: path(out), tone: 'ink', w: 1.1, anim: an });
    for (var c = 0; c < 2; c++) {
      var b = R() * TAU, p1 = pt(s, b, -s.rx * 0.45), p2 = pt(s, b + 0.5, -s.rx * 0.62);
      items.push({ d: path([p1, [(p1[0] + p2[0]) / 2 + 2, (p1[1] + p2[1]) / 2 - 1], p2]), tone: 'ink', w: 0.7, anim: an });
    }
    return items;
  }

  // ---- 3. Podcast → main stone + companion, ripples spreading; dots on the outer ring = episodes listened ----
  (function () {
    var items = ringItems(A, 2.3, true).concat(ringItems(B, 2.7, false));
    for (var j = 0; j < 17; j++) {
      var a = R() * TAU; if (a > MOSS.a0 - 0.2 && a < MOSS.a1 + 0.2) continue;
      var p = pt(A, a, A.dmax + (R() - 0.5) * 3);
      if (inside(B, p[0], p[1], B.dmax + 3)) continue;
      var c = []; for (var q = 0; q < 10; q++) c.push([p[0] + 1.1 * Math.cos(q / 10 * TAU), p[1] + 1.1 * Math.sin(q / 10 * TAU)]);
      items.push({ d: path(c, true), fill: 'ink', stroke: false, anim: { type: 'fade', d: f1(3.4 + j * 0.07), dur: 0.8 } });
    }
    items = items.concat(stoneItems(A, 1.7), stoneItems(B, 2.0));
    groups.push({ key: 'podcast', jp: 'Podcast制作・視聴記録', en: 'Podcasts', motifJp: '石と波紋。声が外へ広がる輪で、外側の点は聴いた回', motifEn: 'A stone and its ripples: a voice spreading outward. The dots on the outer ring are episodes I listened to', hit: { cx: 800, cy: 190, rx: 150, ry: 105 }, items: items });
  })();

  // ---- 4. Figma plugins → a cut stone with squared ripples ----
  (function () {
    var items = ringItems(C, 2.5, false).concat(stoneItems(C, 1.9));
    groups.push({ key: 'plugin', jp: 'Figmaプラグイン開発', en: 'Figma plugins', motifJp: '切石と角い砂紋。人の手で形を決めたもの', motifEn: 'A cut stone with squared ripples: something shaped by hand', hit: { cx: C.cx, cy: C.cy, rx: 68, ry: 60 }, items: items });
  })();

  // ---- 5. Data visualization → moss at the stone's foot, dots joined to their nearest neighbours ----
  (function () {
    var items = [], pts = [], tries = 0;
    while (pts.length < 56 && tries < 5000) {
      tries++;
      var a = MOSS.a0 + R() * (MOSS.a1 - MOSS.a0), d = MOSS.d0 + Math.pow(R(), 1.4) * (MOSS.d1 - MOSS.d0);
      var p = pt(A, a, d);
      if (pts.some(function (q) { return Math.hypot(q[0] - p[0], q[1] - p[1]) < 4.4; })) continue;
      pts.push(p);
    }
    var seen = {};
    pts.forEach(function (p, i) {
      pts.map(function (q, j) { return [Math.hypot(q[0] - p[0], q[1] - p[1]), j]; }).filter(function (v) { return v[1] !== i && v[0] < 9; }).sort(function (x, y) { return x[0] - y[0]; }).slice(0, 1).forEach(function (v) {
        var k = Math.min(i, v[1]) + '-' + Math.max(i, v[1]); if (seen[k]) return; seen[k] = 1;
        items.push({ d: path([p, pts[v[1]]]), tone: 'moss', w: 0.5, op: 0.45, anim: { type: 'fade', d: f1(3.3 + R() * 1.0), dur: 1.0 } });
      });
    });
    pts.forEach(function (p) {
      var r = 0.55 + R() * 0.9, c = []; for (var q = 0; q < 10; q++) c.push([p[0] + r * Math.cos(q / 10 * TAU), p[1] + r * Math.sin(q / 10 * TAU)]);
      items.push({ d: path(c, true), fill: 'moss', stroke: false, anim: { type: 'fade', d: f1(3.1 + R() * 1.1), dur: 0.9 } });
    });
    groups.push({ key: 'moss', jp: 'データ可視化', en: 'Data visualization', motifJp: '石の根元の苔。点を近い順につなぐと網になる', motifEn: 'Moss at the foot of the stone: dots joined to their nearest neighbours become a network', hit: { cx: 704, cy: 214, rx: 34, ry: 30 }, items: items });
  })();

  // ---- 6. Writing with AI → stepping stones leading toward the main stone ----
  (function () {
    var items = [], ts = [0, 0.17, 0.36, 0.52, 0.73, 0.92], who = ['me', 'ai', 'me', 'me', 'ai', 'me'];
    var P0 = [300, 326], P1 = [450, 342], P2 = [592, 298];
    ts.forEach(function (t, k) {
      var x = (1 - t) * (1 - t) * P0[0] + 2 * t * (1 - t) * P1[0] + t * t * P2[0], y = (1 - t) * (1 - t) * P0[1] + 2 * t * (1 - t) * P1[1] + t * t * P2[1];
      var tx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]), ty = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]), rot = Math.atan2(ty, tx);
      var s = stone(0, 0, 14 + R() * 6, 7.5 + R() * 2.5, 2, 0.6, [0]), pts = [];
      for (var q = 0; q < 48; q++) { var p = pt(s, q / 48 * TAU, 0); pts.push([x + p[0] * Math.cos(rot) - p[1] * Math.sin(rot), y + p[0] * Math.sin(rot) + p[1] * Math.cos(rot)]); }
      var an = { type: 'settle', d: f1(3.6 + k * 0.28), dur: 1.2 };
      if (who[k] === 'me') items.push({ d: path(pts, true), fill: 'stone', tone: 'ink', w: 0.9, anim: an });
      else items.push({ d: path(pts, true), fill: 'bg', tone: 'ink', w: 0.9, dash: true, anim: an });
    });
    groups.push({ key: 'steps', jp: 'AIと記事執筆', en: 'Writing with AI', motifJp: '飛石。一歩ずつ書く。塗りの石は自分、点線の石はAI', motifEn: 'Stepping stones: writing one step at a time. Filled stones are mine, dotted ones the AI\'s', hit: { cx: 450, cy: 318, rx: 170, ry: 34 }, items: items });
  })();

  // ---- 7. Favorite images → one fallen leaf, alone in the empty left ----
  (function () {
    var items = [], cx = 150, cy = 232, rot = 32 * Math.PI / 180, L = 74;
    function T(p) { var x = p[0], y = p[1]; return [cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]; }
    function mid(t) { return [4 * Math.sin(t * Math.PI * 0.9), L / 2 - t * L]; }
    function half(t) { return 25 * Math.pow(Math.sin(Math.PI * t), 0.85) * (1 - 0.3 * t); }
    var left = [], right = [];
    for (var i = 0; i <= 26; i++) { var t = i / 26, m = mid(t); left.push(T([m[0] - half(t), m[1]])); right.push(T([m[0] + half(t), m[1]])); }
    var an = { type: 'leaf', d: 4.8, dur: 3.4 };
    items.push({ d: path(left.concat(right.reverse()), true), fill: 'leaf', tone: 'ink', w: 0.9, anim: an });
    var rib = []; for (var i2 = -3; i2 <= 26; i2++) rib.push(T(mid(i2 / 26)));
    items.push({ d: path(rib), tone: 'ink', w: 0.9, anim: an });
    for (var k = 1; k <= 6; k++) {
      var t0 = 0.08 + k * 0.12, side = k % 2 ? -1 : 1, m0 = mid(t0), t1 = Math.min(0.95, t0 + 0.14), m1 = mid(t1);
      items.push({ d: path([T(m0), T([(m0[0] + m1[0]) / 2 + side * half(t1) * 0.45, (m0[1] + m1[1]) / 2]), T([m1[0] + side * half(t1) * 0.82, m1[1]])]), tone: 'ink', w: 0.6, anim: an });
    }
    groups.push({ key: 'leaf', jp: 'お気に入りの画像', en: 'Favorite images', motifJp: '落ち葉が一枚。集めた画像の中の、葉や骨や羽の構造', motifEn: 'A single fallen leaf, for the leaves, bones and feathers in my image collection', hit: { cx: cx, cy: cy, rx: 48, ry: 48 }, items: items });
  })();

  return { W: W, H: H, groups: groups };
}
if (typeof module !== 'undefined') module.exports = { buildGarden: buildGarden };
