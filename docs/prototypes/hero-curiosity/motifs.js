// Motif generator shared by the HTML prototype and the Figma build.
// buildMotifs({hand:true|false}) -> [{key,en,jp,motifJp,motifEn,x,y,w,h,rot,paths:[...]}]
// path: {d, tone:'ink'|'soft', w, fill:'bg'|'ink'|null, stroke:bool, dash:'dots'|null}
function buildMotifs(opts) {
  var hand = !!(opts && opts.hand);
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var R = rng(20261124);      // layout randomness: identical in both styles
  var W = rng(7);             // wobble randomness: only used when hand-drawn
  var f1 = function (v) { return Math.round(v * 10) / 10; };
  var TAU = Math.PI * 2;

  function resample(pts, closed, step) {
    var out = [], n = pts.length, segs = closed ? n : n - 1;
    for (var i = 0; i < segs; i++) {
      var a = pts[i], b = pts[(i + 1) % n];
      var L = Math.hypot(b[0] - a[0], b[1] - a[1]), k = Math.max(1, Math.ceil(L / step));
      for (var j = 0; j < k; j++) out.push([a[0] + (b[0] - a[0]) * j / k, a[1] + (b[1] - a[1]) * j / k]);
    }
    if (!closed) out.push(pts[n - 1]);
    return out;
  }
  // amt scales the hand wobble; 0 keeps the line exact even in hand mode.
  function line(pts, closed, amt) {
    if (amt === undefined) amt = 1;
    var p = pts;
    if (hand && amt > 0) {
      p = resample(pts, closed, 5);
      var a1 = W() * TAU, a2 = W() * TAU, a3 = W() * TAU, a4 = W() * TAU, J = 1.05 * amt;
      p = p.map(function (q, i) {
        return [q[0] + J * (Math.sin(i * 0.31 + a1) * 0.65 + Math.sin(i * 0.11 + a2) * 0.35),
                q[1] + J * (Math.sin(i * 0.27 + a3) * 0.65 + Math.sin(i * 0.09 + a4) * 0.35)];
      });
    }
    var d = 'M' + f1(p[0][0]) + ' ' + f1(p[0][1]);
    for (var i = 1; i < p.length; i++) d += 'L' + f1(p[i][0]) + ' ' + f1(p[i][1]);
    return closed ? d + 'Z' : d;
  }
  function arcPts(cx, cy, r, a0, a1, n, deform) {
    var pts = [];
    for (var i = 0; i <= n; i++) {
      var a = a0 + (a1 - a0) * i / n, rr = deform ? r * deform(a) : r;
      pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
    }
    return pts;
  }
  function sw(base) { return hand ? f1(base * (0.85 + W() * 0.35)) : base; }
  function inEllipse(x, y, cx, cy, rx, ry) { var dx = (x - cx) / rx, dy = (y - cy) / ry; return dx * dx + dy * dy; }

  var out = [];

  // 1. 浮世絵 → 青海波 (seigaiha)
  (function () {
    var P = [], r0 = 20;
    for (var j = 0; j < 7; j++) for (var i = -1; i < 7; i++) {
      var cx = i * 2 * r0 + (j % 2 ? r0 : 0) + 14, cy = 20 + j * r0 * 0.5;
      var e = inEllipse(cx, cy, 108, 58, 104, 52);
      if (e > 1 || (e > 0.6 && R() < 0.5)) continue;
      P.push({ d: line(arcPts(cx, cy, r0 * 0.99, Math.PI, TAU, 24), true, 0), fill: 'bg', stroke: false });
      [1, 0.68, 0.36].forEach(function (k) {
        P.push({ d: line(arcPts(cx, cy, r0 * k, Math.PI, TAU, Math.round(24 * k) + 6), false), tone: 'ink', w: sw(1.05) });
      });
    }
    out.push({ key: 'ukiyoe', jp: '浮世絵', en: 'Ukiyo-e', motifJp: '青海波。江戸の摺物に繰り返し現れる波の文様', motifEn: 'Seigaiha, the wave pattern that recurs in Edo prints', x: 12, y: 132, w: 216, h: 112, paths: P });
  })();

  // 2. 文様 → 麻の葉 (asanoha)
  (function () {
    var s = 26, h = s * 0.866, P = [], seen = {};
    function pt(i, j) { return [i * s + (j % 2 ? s / 2 : 0) - 6, j * h + 6]; }
    function seg(a, b) {
      var k = [f1(a[0]), f1(a[1]), f1(b[0]), f1(b[1])].join(','), k2 = [f1(b[0]), f1(b[1]), f1(a[0]), f1(a[1])].join(',');
      if (seen[k] || seen[k2]) return; seen[k] = 1;
      P.push({ d: line([a, b], false), tone: 'soft', w: sw(0.85) });
    }
    for (var j = 0; j < 6; j++) for (var i = -1; i < 8; i++) {
      var tris = j % 2 === 0
        ? [[pt(i, j), pt(i + 1, j), pt(i, j + 1)], [pt(i + 1, j), pt(i, j + 1), pt(i + 1, j + 1)]]
        : [[pt(i, j), pt(i + 1, j), pt(i + 1, j + 1)], [pt(i, j), pt(i, j + 1), pt(i + 1, j + 1)]];
      tris.forEach(function (t) {
        var c = [(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3];
        var e = inEllipse(c[0], c[1], 86, 72, 82, 66);
        if (e > 1 || (e > 0.62 && R() < 0.45)) return;
        seg(t[0], t[1]); seg(t[1], t[2]); seg(t[2], t[0]);
        t.forEach(function (v) { seg(v, c); });
      });
    }
    out.push({ key: 'monyo', jp: '文様', en: 'Traditional patterns', motifJp: '麻の葉。三角の格子から生まれる幾何学の文様', motifEn: 'Asanoha, a geometric pattern grown from a triangular grid', x: 404, y: 118, w: 172, h: 150, paths: P });
  })();

  // 3. Figma plugin 開発 → nodes, wires, selection handles
  (function () {
    var P = [], nodes = [];
    for (var j = 0; j < 3; j++) for (var i = 0; i < 4; i++) if (R() < 0.78 || (i === 1 && j === 1)) nodes.push([18 + i * 44, 18 + j * 40]);
    nodes.forEach(function (n, k) {
      var x = n[0], y = n[1], q = 5;
      P.push({ d: line([[x - q, y - q], [x + q, y - q], [x + q, y + q], [x - q, y + q]], true, 0.5), fill: k === 2 ? 'ink' : 'bg', tone: 'ink', w: sw(1) });
    });
    for (var k = 0; k < nodes.length - 1; k++) {
      if (R() < 0.3) continue;
      var a = nodes[k], b = nodes[k + 1];
      if (b[0] <= a[0]) continue;
      var mx = (a[0] + b[0]) / 2;
      P.push({ d: line([[a[0] + 5, a[1]], [mx, a[1]], [mx, b[1]], [b[0] - 5, b[1]]], false, 0.7), tone: 'soft', w: sw(0.9) });
    }
    // a selection box with handles around two nodes, the way Figma marks a selection
    var sx0 = 18 + 44 - 12, sy0 = 58 - 12, sx1 = 18 + 88 + 12, sy1 = 58 + 12;
    P.push({ d: line([[sx0, sy0], [sx1, sy0], [sx1, sy1], [sx0, sy1]], true, 0.4), tone: 'ink', w: 0.7 });
    [[sx0, sy0], [sx1, sy0], [sx1, sy1], [sx0, sy1]].forEach(function (c) {
      P.push({ d: line([[c[0] - 2.2, c[1] - 2.2], [c[0] + 2.2, c[1] - 2.2], [c[0] + 2.2, c[1] + 2.2], [c[0] - 2.2, c[1] + 2.2]], true, 0), fill: 'bg', tone: 'ink', w: 0.8 });
    });
    out.push({ key: 'plugin', jp: 'Figmaプラグイン開発', en: 'Figma plugins', motifJp: 'ノードと配線、選択枠のハンドル', motifEn: 'Nodes, wires and the handles of a selection', x: 716, y: 22, w: 168, h: 116, paths: P });
  })();

  // 4. Podcast 視聴記録 → Dear Data style tally, one mark per episode
  (function () {
    var P = [];
    for (var j = 0; j < 4; j++) {
      var by = 20 + j * 21;
      P.push({ d: line([[0, by], [186, by]], false, 0.6), tone: 'soft', w: 0.6 });
      for (var i = 0; i < 20; i++) {
        if (R() < 0.18) continue;
        var x = 4 + i * 9.4, hgt = 3 + R() * 12;
        P.push({ d: line([[x, by], [x, by - hgt]], false, 0.4), tone: 'ink', w: sw(1.05) });
        var u = R();
        if (u < 0.55) P.push({ d: line(arcPts(x, by - hgt - 2.6, 1.35, 0, TAU, 10), true, 0), fill: 'ink', stroke: false });
        else if (u < 0.68) P.push({ d: line(arcPts(x, by - hgt - 3.4, 2.2, 0, TAU, 12), true, 0), fill: 'bg', tone: 'ink', w: 0.8 });
      }
    }
    out.push({ key: 'notes', jp: 'Podcast視聴記録', en: 'Podcast notes', motifJp: '1話に1本の印。長さは聴いた時間、点はメモを取った回', motifEn: 'One mark per episode: length is time listened, a dot means notes taken', x: 852, y: 172, w: 190, h: 92, paths: P });
  })();

  // 5. Podcast 制作 → growth rings / sound rings
  (function () {
    var P = [], c = 64, ph = R() * TAU, ph2 = R() * TAU;
    for (var k = 0; k < 7; k++) {
      var r = 5 + k * 8.4 * (1 + 0.035 * k);
      var def = (function (kk) { return function (a) { return 1 + 0.035 * Math.sin(3 * a + ph + kk * 0.15) + 0.02 * Math.sin(5 * a + ph2); }; })(k);
      var gap = k === 4;
      P.push({ d: line(arcPts(c, c, r, gap ? 0.5 : 0, gap ? TAU - 0.15 : TAU, 56, def), !gap), tone: k % 3 === 2 ? 'soft' : 'ink', w: sw(k === 6 ? 1.2 : 1) });
    }
    P.push({ d: line(arcPts(c, c, 1.6, 0, TAU, 10), true, 0), fill: 'ink', stroke: false });
    out.push({ key: 'rings', jp: 'Podcast制作', en: 'Making a podcast', motifJp: '年輪と音の波紋。1回ごとに輪が1本増える', motifEn: 'Growth rings and sound ripples: each episode adds a ring', x: 560, y: 14, w: 128, h: 128, paths: P });
  })();

  // 6. 記事執筆 with AI → two hands writing: solid line = me, dots = AI
  (function () {
    var P = [], lens = [190, 168, 182, 120, 72];
    lens.forEach(function (L, k) {
      var y = 10 + k * 15, fr = 0.34 + R() * 0.12, amp = 2.1, split = L * (0.45 + R() * 0.3), pts = [];
      for (var x = 0; x <= L; x += 2) pts.push([x, y + amp * Math.sin(x * fr) * (0.55 + 0.45 * Math.sin(x * 0.05 + k))]);
      var cut = Math.round(split / 2);
      P.push({ d: line(pts.slice(0, cut + 1), false, 0.5), tone: 'ink', w: sw(1.05) });
      if (k % 2 === 0 || k === 3) P.push({ d: line([[split + 4, y], [L, y]], false, 0.3), tone: 'ink', w: 1.4, dash: 'dots' });
      else P.push({ d: line(pts.slice(cut), false, 0.5), tone: 'ink', w: sw(1.05) });
    });
    out.push({ key: 'writing', jp: 'AIと記事執筆', en: 'Writing with AI', motifJp: '2つの手で書く行。実線が自分、点線がAI', motifEn: 'Lines written by two hands: solid is me, dotted is the AI', x: 642, y: 186, w: 192, h: 76, paths: P });
  })();

  // 7. Data visualization → slime-mold network of particles
  (function () {
    var P = [], pts = [], tries = 0;
    while (pts.length < 44 && tries < 4000) {
      tries++;
      var x = 6 + R() * 200, y = 6 + R() * 120;
      if (inEllipse(x, y, 106, 66, 100, 60) > 1) continue;
      if (pts.some(function (p) { return Math.hypot(p[0] - x, p[1] - y) < 13; })) continue;
      pts.push([x, y]);
    }
    var seen = {};
    pts.forEach(function (p, i) {
      var near = pts.map(function (q, j) { return [Math.hypot(q[0] - p[0], q[1] - p[1]), j]; }).filter(function (v) { return v[1] !== i; }).sort(function (a, b) { return a[0] - b[0]; }).slice(0, 2);
      near.forEach(function (v) {
        var key = Math.min(i, v[1]) + '-' + Math.max(i, v[1]);
        if (seen[key]) return; seen[key] = 1;
        P.push({ d: line([p, pts[v[1]]], false, 0.5), tone: 'soft', w: sw(0.85) });
      });
    });
    pts.forEach(function (p) {
      var r = 1 + R() * 1.8;
      if (R() < 0.12) P.push({ d: line(arcPts(p[0], p[1], r + 2.2, 0, TAU, 14), true, 0), fill: 'bg', tone: 'ink', w: 0.8 });
      else P.push({ d: line(arcPts(p[0], p[1], r, 0, TAU, 10), true, 0), fill: 'ink', stroke: false });
    });
    out.push({ key: 'dataviz', jp: 'データ可視化', en: 'Data visualization', motifJp: '粘菌のような網。点を近い順につなぐ', motifEn: 'A slime-mold network: each point joins its nearest neighbours', x: 196, y: 10, w: 212, h: 132, paths: P });
  })();

  // 8. Favorite images → leaf venation
  (function () {
    var P = [], cx = 60, top = 8, base = 138, Lh = base - top;
    function mid(t) { return [cx + 6 * Math.sin(t * Math.PI * 0.9), base - t * Lh]; }
    function half(t) { return 46 * Math.pow(Math.sin(Math.PI * t), 0.85) * (1 - 0.3 * t); }
    var left = [], right = [];
    for (var i = 0; i <= 30; i++) { var t = i / 30, m = mid(t); left.push([m[0] - half(t), m[1]]); right.push([m[0] + half(t), m[1]]); }
    P.push({ d: line(left.concat(right.reverse()), true), fill: 'bg', tone: 'ink', w: sw(1.1) });
    var ribPts = []; for (var i2 = -2; i2 <= 30; i2++) ribPts.push(mid(i2 / 30));
    P.push({ d: line(ribPts, false), tone: 'ink', w: sw(1.15) });
    for (var k = 1; k <= 8; k++) {
      var t0 = 0.06 + k * 0.1, side = k % 2 ? -1 : 1, m0 = mid(t0), t1 = Math.min(0.97, t0 + 0.13);
      var hw = half(t1) * 0.86, m1 = mid(t1);
      var end = [m1[0] + side * hw, m1[1]], ctl = [m0[0] + side * hw * 0.55, m0[1] - 4];
      var vp = []; for (var s = 0; s <= 8; s++) { var u = s / 8; vp.push([(1 - u) * (1 - u) * m0[0] + 2 * u * (1 - u) * ctl[0] + u * u * end[0], (1 - u) * (1 - u) * m0[1] + 2 * u * (1 - u) * ctl[1] + u * u * end[1]]); }
      P.push({ d: line(vp, false, 0.6), tone: 'ink', w: sw(0.8) });
      var b = vp[4];
      P.push({ d: line([b, [b[0] - side * 6, b[1] - 9]], false, 0.4), tone: 'soft', w: 0.6 });
    }
    out.push({ key: 'images', jp: 'お気に入りの画像', en: 'Favorite images', motifJp: '葉脈。集めた画像の中で一番多い「生き物の構造」から', motifEn: 'Leaf veins, from the living structures that fill the image collection', x: 912, y: 4, w: 124, h: 150, rot: -16, paths: P });
  })();

  return out;
}
if (typeof module !== 'undefined') module.exports = { buildMotifs: buildMotifs };
