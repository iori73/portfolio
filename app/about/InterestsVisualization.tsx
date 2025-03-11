// // // // import React, { useEffect, useRef } from 'react';
'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface InterestNode {
  name: string;
  curve?: string;
  color?: string;
  children?: InterestNode[];
}

interface InterestData {

  name: string;
  children: InterestNode[];
}

const InterestsVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/my_interests_colors.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: InterestData = await response.json();
        createVisualization(data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const createVisualization = (data: InterestData) => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 600;

    svg
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('width', width)
      .attr('height', height);

    // 1) 階層データに変換
    const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();

    // メインカテゴリ(depth=1)だけ配列にまとめる
    const mainCategories = nodes.filter((d) => d.depth === 1);

    // 2) forceシミュレーション
    // const simulation = d3
    //   .forceSimulation(nodes)
    //   .force(
    //     'link',
    //     d3
    //       .forceLink(links)
    //       .id((d: any) => d.id)
    //       .distance(100),
    //   )
    //   .force('charge', d3.forceManyBody().strength(-400))
    //   .force('center', d3.forceCenter(0, 0))
    //   .force('x', d3.forceX())
    //   .force('y', d3.forceY());
    // 2) forceシミュレーション（distanceを関数に変更）
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance((d: any) => {
            const sd = d.source.depth;
            const td = d.target.depth;
            if ((sd === 0 && td === 1) || (sd === 1 && td === 0)) {
              return 100; // 0→1 のリンクは100
            } else if ((sd === 1 && td === 2) || (sd === 2 && td === 1)) {
              return 80; // 1→2 のリンクは半分
            }
            return 100; // その他はデフォルト値
          }),
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(0, 0))
      .force('x', d3.forceX())
      .force('y', d3.forceY());


    // curved text 用 <defs>
    const defs = svg.append('defs');

    // 3) パス(単一)を定義 (左右分割せず)
    mainCategories.forEach((node, i) => {
      defs
        .append('path')
        .attr('id', `arcPath-${i}`)
        .attr('d', 'M 0,0 A 40,40 0 0,1 0,0'); // 初期値はダミー; tick で更新
    });

    // 4) リンクの描画
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.4)
      // --- ★リンクの太さを階層に応じて変更 ---
      .attr('stroke-width', (d) => {
        const sd = (d.source as any).depth;
        const td = (d.target as any).depth;
        const minD = Math.min(sd, td);
        const maxD = Math.max(sd, td);
        // 0→1 のリンク => 2
        if (minD === 0 && maxD === 1) {
          return 2;
        }
        // 1→2 のリンク => 1.5
        if (minD === 1 && maxD === 2) {
          return 1;
        }
        // それ以外(もっと深い階層など) => 1
        return 1;
      });


  

    // 5) ノードグループ
    const node = svg
      .append('g')
      .selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .call(drag(simulation));

    // 6) ノードの円
    // node
    //   .append('circle')
    //   .attr('r', (d) => (d.depth === 0 ? 30 : d.depth === 1 ? 20 : 8))
    //   .attr('fill', (d) => {
    //     const nd = d.data as InterestNode;
    //     return nd.color || (d.depth === 0 ? '#fff' : '#ccc');
    //   })
    //   .attr('stroke', '#333')
    //   .attr('stroke-width', 1.5);
    node
      .append('circle')
      .attr('r', (d) => (d.depth === 0 ? 30 : d.depth === 1 ? 20 : 8))
      .attr('fill', (d) => {
        const nd = d.data;
        // 末端ノードの場合、親の色の opacity 50% にする
        if ((!d.children || d.children.length === 0) && d.parent && d.parent.data.color) {
          const parentColor = d3.color(d.parent.data.color);
          if (parentColor) {
            parentColor.opacity = 0.5;
            return parentColor.toString();
          }
        }
        return nd.color || (d.depth === 0 ? '#fff' : '#ccc');
      })
      .attr('stroke', '#333')
      .attr('stroke-width', 1.5);

    // 7) ノードのテキストラベル
    node
      .append('text')
      .attr('dy', (d) => (d.depth === 0 ? -35 : -25))
      .attr('text-anchor', 'middle')
      // --- ★階層に応じてフォントサイズを変更 ---
      .attr('font-size', (d) => {
        if (d.depth === 0) return '18px'; // root (My Interests)
        if (d.depth === 1) return '16px'; // 中間
        return '12px'; // 末端
      })
      .text((d) => (d.data as InterestNode).name);

    // 8) メインカテゴリ用のカーブテキスト
    mainCategories.forEach((n, i) => {
      const nodeData = n.data as InterestNode;
      const curveText = nodeData.curve || '';

      // テキスト要素
      svg
        .append('text')
        .attr('class', `curved-text-${i}`)
        .attr('dy', -5)
        .attr('font-size', '12px')
        .attr('fill', nodeData.color || '#333')
        .append('textPath')
        .attr('href', `#arcPath-${i}`)
        .attr('startOffset', '50%') // 中央から開始
        .attr('text-anchor', 'middle')
        .text(curveText)
        .attr('letter-spacing', '-1px');
    });

    // 9) シミュレーションのtickで位置更新
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as any).x)
        .attr('y1', (d) => (d.source as any).y)
        .attr('x2', (d) => (d.target as any).x)
        .attr('y2', (d) => (d.target as any).y);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);

      // パスを「半円」にする (半径40)
      mainCategories.forEach((n, i) => {
        defs
          .select(`#arcPath-${i}`)
          .attr(
            'd',
            `M ${n.x! - 40},${n.y!}
             A 40,40 0 0,1
               ${n.x! + 40},${n.y!}`,
          );
      });
    });

    // ドラッグ機能
    function drag(simulation: d3.Simulation<any, any>) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag<SVGGElement, unknown>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  };

  return (
    <div className="w-full h-full py-8">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default InterestsVisualization;




// // o3-high-mini ❌

// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';

// interface InterestNode {
//   name: string;
//   curve?: string;
//   color?: string;
//   children?: InterestNode[];
// }

// interface InterestData {
//   name: string;
//   children: InterestNode[];
// }

// const INTERVAL_DURATION = 1500; // ノード追加の間隔(ミリ秒)

// const InterestsVisualization: React.FC = () => {
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   // ノード・リンクを段階的に追加するためのステート
//   const [visibleNodes, setVisibleNodes] = useState<d3.HierarchyNode<InterestNode>[]>([]);
//   const [visibleLinks, setVisibleLinks] = useState<d3.HierarchyLink<InterestNode>[]>([]);

//   // 全ノード・リンクを BFS 順に並べた配列
//   const allNodesRef = useRef<d3.HierarchyNode<InterestNode>[]>([]);
//   const allLinksRef = useRef<d3.HierarchyLink<InterestNode>[]>([]);
//   const currentIndexRef = useRef<number>(0); // 次に追加するノードのインデックス

//   // D3のforceSimulationを保持
//   const simulationRef = useRef<d3.Simulation<d3.HierarchyNode<InterestNode>, undefined> | null>(
//     null
//   );

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const response = await fetch('/data/my_interests_colors.json');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: InterestData = await response.json();

//         // 1) ツリーを作成し、BFS順にノードを並べる
//         prepareData(data);

//         // 2) 初期表示はルートノードのみ
//         const initialNode = allNodesRef.current[0];
//         setVisibleNodes([initialNode]);
//         setVisibleLinks([]); // ルートはまだリンクがない

//         // 3) SVG & forceSimulation初期化
//         initSimulation();

//         // 4) 定期的にノードを1つずつ追加
//         const timer = setInterval(() => {
//           revealNextNode();
//         }, INTERVAL_DURATION);

//         return () => {
//           clearInterval(timer);
//         };
//       } catch (error) {
//         console.error('Error loading data:', error);
//       }
//     };

//     loadData();
//   }, []);

//   // -------------------------------------------------
//   // ツリーをBFSで走査して全ノード・リンクの順序リストを作成
//   // -------------------------------------------------
//   const prepareData = (data: InterestData) => {
//     const root = d3.hierarchy<InterestNode>(data);
//     // 階層のリンクを事前に計算しておく
//     const allLinks = root.links();

//     // BFSでノードを走査
//     const queue: d3.HierarchyNode<InterestNode>[] = [];
//     const bfsNodes: d3.HierarchyNode<InterestNode>[] = [];

//     queue.push(root);
//     while (queue.length > 0) {
//       const node = queue.shift()!;
//       bfsNodes.push(node);
//       if (node.children) {
//         for (const child of node.children) {
//           queue.push(child);
//         }
//       }
//     }

//     allNodesRef.current = bfsNodes;
//     allLinksRef.current = allLinks;
//     currentIndexRef.current = 1; // 0番目(ルート)は最初から表示
//   };

//   // -------------------------------------------------
//   // ノードを1つ追加して再描画
//   // -------------------------------------------------
//   const revealNextNode = () => {
//     if (currentIndexRef.current >= allNodesRef.current.length) {
//       return; // すべて表示済み
//     }

//     // 新たに可視化するノード
//     const newNode = allNodesRef.current[currentIndexRef.current];
//     currentIndexRef.current += 1;

//     // 追加するノードの親がいれば、そのリンクを可視化リンクに追加
//     const parent = newNode.parent;
//     let newLink: d3.HierarchyLink<InterestNode> | null = null;
//     if (parent) {
//       // parent→newNode のリンクを取得
//       const foundLink = allLinksRef.current.find(
//         (l) => l.source === parent && l.target === newNode
//       );
//       if (foundLink) {
//         newLink = foundLink;
//       }
//     }

//     setVisibleNodes((prev) => [...prev, newNode]);
//     setVisibleLinks((prev) => (newLink ? [...prev, newLink] : [...prev]));

//     // simulationを再加熱
//     simulationRef.current?.alpha(1).restart();
//   };

//   // -------------------------------------------------
//   // forceSimulationの初期設定
//   // -------------------------------------------------
//   const initSimulation = () => {
//     if (!svgRef.current) return;

//     const width = 800;
//     const height = 600;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll('*').remove();

//     svg
//       .attr('viewBox', [-width / 2, -height / 2, width, height])
//       .attr('width', width)
//       .attr('height', height);

//     // シミュレーション作成
//     const simulation = d3
//       .forceSimulation<d3.HierarchyNode<InterestNode>>()
//       .force(
//         'link',
//         d3
//           .forceLink<d3.HierarchyNode<InterestNode>, d3.HierarchyLink<InterestNode>>()
//           .id((d: any) => d.id)
//           .distance(100)
//       )
//       .force('charge', d3.forceManyBody<d3.HierarchyNode<InterestNode>>().strength(-300))
//       .force('center', d3.forceCenter(0, 0))
//       .force('x', d3.forceX().strength(0.05))
//       .force('y', d3.forceY().strength(0.05));

//     simulationRef.current = simulation;

//     // 描画ループ
//     // 毎フレーム visibleNodes / visibleLinks から再描画
//     simulation.on('tick', () => {
//       render(svg, simulation);
//     });
//   };

//   // -------------------------------------------------
//   // SVG要素の更新 (tickごとに呼ばれる)
//   // -------------------------------------------------
//   const render = (
//     svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
//     simulation: d3.Simulation<d3.HierarchyNode<InterestNode>, undefined>
//   ) => {
//     // シミュレーションに最新のノード/リンクを適用
//     simulation.nodes(visibleNodes);
//     const linkForce = simulation.force<d3.ForceLink<d3.HierarchyNode<InterestNode>, d3.HierarchyLink<InterestNode>>>(
//       'link'
//     );
//     if (linkForce) {
//       linkForce.links(visibleLinks);
//     }

//     // リンクの描画
//     const linkSelection = svg.selectAll<SVGLineElement, d3.HierarchyLink<InterestNode>>('.link')
//       .data(visibleLinks, (d: any) => d.target.data.name);

//     // enter
//     const linkEnter = linkSelection
//       .enter()
//       .append('line')
//       .attr('class', 'link')
//       .attr('stroke', '#999')
//       .attr('stroke-width', 0) // 初期は細く
//       .attr('opacity', 0);

//     // enter + update
//     linkEnter.merge(linkSelection as any)
//       .transition()
//       .duration(1000)
//       .attr('stroke-width', 2)
//       .attr('opacity', 0.7);

//     // exit
//     linkSelection.exit().remove();

//     // tickで位置更新
//     svg.selectAll<SVGLineElement, d3.HierarchyLink<InterestNode>>('.link')
//       .attr('x1', (d) => (d.source as any).x)
//       .attr('y1', (d) => (d.source as any).y)
//       .attr('x2', (d) => (d.target as any).x)
//       .attr('y2', (d) => (d.target as any).y);

//     // ノードの描画
//     const nodeSelection = svg.selectAll<SVGGElement, d3.HierarchyNode<InterestNode>>('.node')
//       .data(visibleNodes, (d: any) => d.data.name);

//     // enter
//     const nodeEnter = nodeSelection
//       .enter()
//       .append('g')
//       .attr('class', 'node')
//       .call(drag(simulation));

//     nodeEnter
//       .append('circle')
//       .attr('r', 0) // 初期は半径0
//       .attr('fill', (d) => {
//         if (d.depth === 0) return '#fff';
//         return d.data.color || '#ccc';
//       })
//       .attr('stroke', '#333')
//       .attr('stroke-width', 1.5)
//       .transition()
//       .duration(1000)
//       .attr('r', (d) => {
//         if (d.depth === 0) return 30;
//         if (d.depth === 1) return 20;
//         return 8;
//       });

//     nodeEnter
//       .append('text')
//       .attr('text-anchor', 'middle')
//       .attr('dy', (d) => (d.depth === 0 ? -35 : -25))
//       .attr('font-size', (d) => {
//         if (d.depth === 0) return '18px'; // root
//         if (d.depth === 1) return '14px'; // middle
//         return '12px';
//       })
//       .text((d) => d.data.name);

//     // exit
//     nodeSelection.exit().remove();

//     // tickで位置更新
//     svg
//       .selectAll<SVGGElement, d3.HierarchyNode<InterestNode>>('.node')
//       .attr('transform', (d) => `translate(${d.x},${d.y})`);
//   };

//   // -------------------------------------------------
//   // ドラッグ機能
//   // -------------------------------------------------
//   const drag = (simulation: d3.Simulation<d3.HierarchyNode<InterestNode>, undefined>) => {
//     function dragstarted(event: any, d: d3.HierarchyNode<InterestNode>) {
//       if (!event.active) simulation.alphaTarget(0.3).restart();
//       d.fx = d.x;
//       d.fy = d.y;
//     }

//     function dragged(event: any, d: d3.HierarchyNode<InterestNode>) {
//       d.fx = event.x;
//       d.fy = event.y;
//     }

//     function dragended(event: any, d: d3.HierarchyNode<InterestNode>) {
//       if (!event.active) simulation.alphaTarget(0);
//       d.fx = null;
//       d.fy = null;
//     }

//     return d3
//       .drag<SVGGElement, d3.HierarchyNode<InterestNode>>()
//       .on('start', dragstarted)
//       .on('drag', dragged)
//       .on('end', dragended);
//   };

//   return (
//     <div className="w-full h-full py-8">
//       <svg ref={svgRef} className="w-full h-full" />
//     </div>
//   );
// };

// export default InterestsVisualization;




// // fluctuation
// 'use client';
// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// interface InterestNode {
//   name: string;
//   curve?: string;
//   color?: string;
//   children?: InterestNode[];
// }

// interface InterestData {
//   name: string;
//   children: InterestNode[];
// }

// const InterestsVisualization: React.FC = () => {
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await fetch('/data/my_interests_colors.json');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: InterestData = await response.json();
//         createVisualization(data);
//       } catch (error) {
//         console.error('Error loading data:', error);
//       }
//     })();
//   }, []);

//   function createVisualization(data: InterestData) {
//     if (!svgRef.current) return;

//     // 既存の要素をクリア
//     const svg = d3.select(svgRef.current);
//     svg.selectAll('*').remove();

//     const width = 800;
//     const height = 600;
//     // 半径(余白を少し引いておく)
//     const radius = Math.min(width, height) / 2 - 40;

//     // SVGのビューボックス設定
//     svg
//       .attr('viewBox', [-width / 2, -height / 2, width, height])
//       .attr('width', width)
//       .attr('height', height);

//     // (1) 階層化
//     const root = d3.hierarchy<InterestNode>(data);

//     // (2) ツリーの設定 (Radial)
//     //   x: 角度(0~2π), y: 半径方向
//     const tree = d3.tree<InterestNode>().size([2 * Math.PI, radius]);
//     tree(root);
//     // これにより root.descendants() の各ノードに x(角度), y(半径) が付与される

//     // (3) リンク生成: d3.linkRadial() を使うと、角度 & 半径 でパスを生成
//     const linkRadial = d3
//       .linkRadial<d3.HierarchyPointNode<InterestNode>, d3.HierarchyPointNode<InterestNode>>()
//       .angle((d) => d.x)
//       .radius((d) => d.y);

//     // (4) リンクを描画
//     // svg
//     //   .append('g')
//     //   .selectAll('path')
//     //   .data(root.links())
//     //   .enter()
//     //   .append('path')
//     //   .attr('fill', 'none')
//     //   .attr('stroke', '#999')
//     //   .attr('stroke-width', 2)
//     //   .attr('opacity', 0.7)
//     //   .attr('d', (d) => linkRadial(d) ?? '');
//     // (4) リンクを描画（ランダムオフセット付き）
//     svg
//       .append('g')
//       .selectAll('path')
//       .data(root.links())
//       .enter()
//       .append('path')
//       .attr('fill', 'none')
//       .attr('stroke', '#999')
//       .attr('stroke-width', 2)
//       .attr('opacity', 0.7)
//       .attr('d', (d) => {
//         const sx = radialPoint(d.source.x, d.source.y);
//         const tx = radialPoint(d.target.x, d.target.y);
//         // 中間点にランダムなオフセットを加える
//         const mx = [(sx[0] + tx[0]) / 2 + (Math.random() - 0.5) * 20, (sx[1] + tx[1]) / 2 + (Math.random() - 0.5) * 20];
//         const points: [number, number][] = [sx, mx, tx];
//         return d3.line<[number, number]>().curve(d3.curveCatmullRom.alpha(0.5))(points);
//       });

//     // (5) ノードを描画
//     const node = svg
//       .append('g')
//       .selectAll('g')
//       .data(root.descendants())
//       .enter()
//       .append('g')
//       // 極座標(x: 角度, y: 半径) を XY座標に変換して配置
//       .attr('transform', (d) => {
//         const [px, py] = radialPoint(d.x, d.y);
//         return `translate(${px},${py})`;
//       });

//     // 円
//     node
//       .append('circle')
//       .attr('r', (d) => {
//         if (d.depth === 0) return 30; // root
//         if (d.depth === 1) return 20; // 大項目
//         return 8; // 小項目
//       })
//       .attr('fill', (d) => {
//         const nd = d.data;
//         if (d.depth === 0) return '#fff';
//         return nd.color || '#ccc';
//       })
//       .attr('stroke', '#333')
//       .attr('stroke-width', 1.5);

//     // テキスト
//     node
//       .append('text')
//       .attr('dy', (d) => (d.depth === 0 ? -35 : -25))
//       .attr('text-anchor', 'middle')
//       .attr('font-size', (d) => {
//         if (d.depth === 0) return '18px';
//         if (d.depth === 1) return '16px';
//         return '12px';
//       })
//       .text((d) => d.data.name);
//   }

//   // (6) 極座標→XY座標に変換するヘルパー
//   function radialPoint(x: number, y: number): [number, number] {
//     // xは [0, 2π], yは半径(0~radius)
//     // SVG座標では、角度0が12時方向になるように少しシフト
//     return [y * Math.cos(x - Math.PI / 2), y * Math.sin(x - Math.PI / 2)];
//   }

//   return (
//     <div className="w-full h-full py-8">
//       <svg ref={svgRef} className="w-full h-full" />
//     </div>
//   );
// };

// export default InterestsVisualization;



