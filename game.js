/**
 * ========================================================
 * BLOCK BLAST! 脆皮捏捏消消樂 - 核心遊戲引擎
 * 8x8 棋盤、手勢拖曳與指尖避障位移、ASMR 消除、粒子系統、
 * 多種主題切換、連擊系統與輔助技能
 * ========================================================
 */

(function () {
  'use strict';

  // --- 常數定義 ---
  const BOARD_SIZE = 8;
  const LOCAL_STORAGE_KEY_BEST = 'block_blast_best_score_v1';
  const LOCAL_STORAGE_KEY_THEME = 'block_blast_theme_v1';
  const LOCAL_STORAGE_KEY_SKIN = 'block_blast_skin_v1';

  // --- 生動動態精靈工廠 (Vivid Living Sprites & Dynamic SVG Factory) ---
  const VividStampFactory = {
    getSVG(skin, charIndex, seed = 0) {
      const delay = -(((charIndex * 1.3) + (seed * 0.7)) % 3.6).toFixed(1);
      const earDelay = -(((charIndex * 1.7) + (seed * 0.5)) % 4.2).toFixed(1);

      // 1. 夢幻甜點 (Dreamy Desserts: 草莓千層蛋糕、焦糖布丁、櫻桃杯子蛋糕、熔岩甜甜圈、法式馬卡龍)
      if (skin === 'dessert') {
        const charId = Math.abs(charIndex) % 5;
        if (charId === 0) {
          // 草莓雙層奶油千層蛋糕 (Strawberry Shortcake)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <path d="M7,28 L33,28 L31,16 L12,16 Z" fill="#ffeaa7" stroke="#fdcb6e" stroke-width="0.8"/>
            <path d="M8.5,22 L31.5,22 L31,20 L10,20 Z" fill="#ff4757" opacity="0.85"/>
            <path d="M7,28 L33,28 L32,25 L8,25 Z" fill="#ffffff" opacity="0.95"/>
            <path d="M10,17 L31,17 L30.5,14 L11.5,14 Z" fill="#ffffff" opacity="0.95"/>
            <circle cx="15" cy="14" r="3.2" fill="#ffffff"/>
            <circle cx="21" cy="13" r="3.6" fill="#ffffff"/>
            <circle cx="27" cy="14" r="3.2" fill="#ffffff"/>
            <path d="M20,6 C16,6 16,12 21,14 C26,12 26,6 22,6 Z" fill="#ff3838"/>
            <circle cx="19" cy="8.5" r="0.6" fill="#ffffff" opacity="0.85"/>
            <circle cx="22" cy="9.5" r="0.6" fill="#ffffff" opacity="0.85"/>
            <circle cx="20.5" cy="11.5" r="0.6" fill="#ffffff" opacity="0.85"/>
            <g class="vivid-sprout">
              <path d="M21,6 Q18,2 16,4 Q19,5 21,6" fill="#2ed573"/>
              <path d="M21,6 Q24,2 26,4 Q23,5 21,6" fill="#2ed573"/>
            </g>
            <circle class="vivid-blush" cx="12" cy="24" r="2.2" fill="#ff6b8b"/>
            <circle class="vivid-blush" cx="28" cy="24" r="2.2" fill="#ff6b8b"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="16" cy="21" r="2.2" fill="#2d3436"/>
              <circle cx="16.8" cy="20.2" r="0.9" fill="#ffffff"/>
              <circle cx="24" cy="21" r="2.2" fill="#2d3436"/>
              <circle cx="24.8" cy="20.2" r="0.9" fill="#ffffff"/>
            </g>
            <path d="M18.5,24 Q20,26 21.5,24" fill="none" stroke="#2d3436" stroke-width="1.2" stroke-linecap="round"/>
            <g class="vivid-glint" style="transform-origin: 30px 10px; animation-delay:${delay}s;">
              <polygon points="30,7 31,9.5 33.5,10 31,10.5 30,13 29,10.5 26.5,10 29,9.5" fill="#ffffff"/>
            </g>
          </svg>`;
        } else if (charId === 1) {
          // 焦糖布丁 (Caramel Purin / Flan)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite pudding-wobble">
            <ellipse cx="20" cy="32" rx="15" ry="3" fill="#ffffff" opacity="0.7"/>
            <path d="M12,16 L9,30 Q20,33 31,30 L28,16 Z" fill="#fed330"/>
            <ellipse cx="20" cy="16" rx="8" ry="3" fill="#fed330"/>
            <ellipse cx="20" cy="16" rx="8" ry="3" fill="#5c2c16"/>
            <path d="M12,16 Q14,23 16,19 Q19,25 21,18 Q25,23 28,16 Z" fill="#5c2c16"/>
            <ellipse cx="18" cy="15" rx="4" ry="1.2" fill="#ffffff" opacity="0.4"/>
            <circle cx="20" cy="10" r="3.5" fill="#ff3838"/>
            <circle cx="18.8" cy="8.8" r="1.1" fill="#ffffff"/>
            <path d="M20,7.5 Q24,2 26,4" fill="none" stroke="#2ed573" stroke-width="1.3" stroke-linecap="round"/>
            <circle class="vivid-blush" cx="13" cy="26" r="2.5" fill="#ff7675" opacity="0.85"/>
            <circle class="vivid-blush" cx="27" cy="26" r="2.5" fill="#ff7675" opacity="0.85"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="16.5" cy="22" r="2" fill="#3d2314"/>
              <circle cx="17.2" cy="21.2" r="0.8" fill="#ffffff"/>
              <circle cx="23.5" cy="22" r="2" fill="#3d2314"/>
              <circle cx="24.2" cy="21.2" r="0.8" fill="#ffffff"/>
            </g>
            <path d="M19,25 Q20,27 21,25" fill="none" stroke="#3d2314" stroke-width="1.2" stroke-linecap="round"/>
          </svg>`;
        } else if (charId === 2) {
          // 櫻桃杯子蛋糕 (Cherry Cupcake)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <polygon points="12,23 28,23 25,33 15,33" fill="#ff9ff3" stroke="#f368e0" stroke-width="0.8"/>
            <line x1="16" y1="23" x2="17.5" y2="33" stroke="#f368e0" stroke-width="0.8"/>
            <line x1="20" y1="23" x2="20" y2="33" stroke="#f368e0" stroke-width="0.8"/>
            <line x1="24" y1="23" x2="22.5" y2="33" stroke="#f368e0" stroke-width="0.8"/>
            <path d="M9,23 Q7,18 13,17 Q14,11 20,11 Q26,11 27,17 Q33,18 31,23 Z" fill="#ffffff"/>
            <path d="M12,18 Q16,14 20,15 Q24,14 28,18" fill="none" stroke="#ffb8b8" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M17,13 Q20,8 23,13" fill="none" stroke="#ffb8b8" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="13" cy="18" r="1" fill="#ff4757"/>
            <circle cx="27" cy="18" r="1" fill="#1e90ff"/>
            <circle cx="23" cy="13" r="1" fill="#ffa502"/>
            <circle cx="17" cy="14" r="1" fill="#2ed573"/>
            <circle cx="20" cy="7.5" r="3.2" fill="#ff3838"/>
            <circle cx="19" cy="6.5" r="1" fill="#ffffff"/>
            <path d="M20,5 Q23,1 26,3" fill="none" stroke="#2ed573" stroke-width="1.2"/>
            <circle class="vivid-blush" cx="14" cy="27" r="1.8" fill="#ff6b8b"/>
            <circle class="vivid-blush" cx="26" cy="27" r="1.8" fill="#ff6b8b"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <path d="M16,27 Q18,25 20,27" fill="none" stroke="#3d2314" stroke-width="1.2"/>
              <path d="M20,27 Q22,25 24,27" fill="none" stroke="#3d2314" stroke-width="1.2"/>
            </g>
            <path d="M19,29 Q20,31 21,29" fill="none" stroke="#3d2314" stroke-width="1.1"/>
          </svg>`;
        } else if (charId === 3) {
          // 繽紛熔岩甜甜圈 (Glazed Donut Pal)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <circle cx="20" cy="20" r="14" fill="#f7b731"/>
            <circle cx="20" cy="20" r="5" fill="none" stroke="#3d2314" stroke-width="0.8" opacity="0.3"/>
            <path d="M8,17 Q11,21 14,18 Q18,24 22,18 Q26,23 29,18 Q32,21 32,17 C32,9 8,9 8,17 Z" fill="#ff6b8b"/>
            <path d="M12,12 C14,8 26,8 28,12" stroke="#ffffff" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.6"/>
            <line x1="12" y1="12" x2="14" y2="14" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round"/>
            <line x1="25" y1="12" x2="27" y2="14" stroke="#ffd32a" stroke-width="1.4" stroke-linecap="round"/>
            <line x1="18" y1="10" x2="20" y2="10" stroke="#00d2d3" stroke-width="1.4" stroke-linecap="round"/>
            <line x1="21" y1="13" x2="23" y2="14" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round"/>
            <circle cx="20" cy="26" r="6" fill="#ffffff" opacity="0.92"/>
            <circle class="vivid-blush" cx="16" cy="27" r="1.5" fill="#ff7675"/>
            <circle class="vivid-blush" cx="24" cy="27" r="1.5" fill="#ff7675"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="17.5" cy="25" r="1.5" fill="#3d2314"/>
              <circle cx="18" cy="24.5" r="0.5" fill="#ffffff"/>
              <circle cx="22.5" cy="25" r="1.5" fill="#3d2314"/>
              <circle cx="23" cy="24.5" r="0.5" fill="#ffffff"/>
            </g>
            <path d="M19,27.5 Q20,29.5 21,27.5" fill="#ff4757"/>
          </svg>`;
        } else {
          // 法式夾心馬卡龍 (French Macaron)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <path d="M8,17 C8,9 32,9 32,17 Z" fill="#ff9ff3"/>
            <ellipse cx="20" cy="18" rx="12" ry="2" fill="#f368e0"/>
            <ellipse cx="14" cy="14" rx="4" ry="1.5" fill="#ffffff" opacity="0.5" transform="rotate(-15 14 14)"/>
            <rect x="9" y="18" width="22" height="4" rx="2" fill="#ffffff"/>
            <line x1="10" y1="20" x2="30" y2="20" stroke="#ffeaa7" stroke-width="1.2" stroke-linecap="round"/>
            <ellipse cx="20" cy="22" rx="12" ry="2" fill="#f368e0"/>
            <path d="M8,23 C8,29 32,29 32,23 Z" fill="#ff9ff3"/>
            <path class="vivid-blush" d="M12,20 C11,18.5 13,17.5 14,19 C15,17.5 17,18.5 16,20 L14,22 Z" fill="#ff4757"/>
            <path class="vivid-blush" d="M24,20 C23,18.5 25,17.5 26,19 C27,17.5 29,18.5 28,20 L26,22 Z" fill="#ff4757"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <ellipse cx="17.5" cy="17" rx="1.6" ry="2.2" fill="#3d2314"/>
              <circle cx="18" cy="16.2" r="0.8" fill="#ffffff"/>
              <ellipse cx="22.5" cy="17" rx="1.6" ry="2.2" fill="#3d2314"/>
              <circle cx="23" cy="16.2" r="0.8" fill="#ffffff"/>
            </g>
            <path d="M19,21 Q20,23 21,21" fill="none" stroke="#3d2314" stroke-width="1.1" stroke-linecap="round"/>
            <g class="vivid-glint" style="transform-origin: 29px 12px; animation-delay:${delay}s;">
              <polygon points="29,8 30,10.5 32.5,11 30,11.5 29,14 28,11.5 25.5,11 28,10.5" fill="#ffffff"/>
            </g>
          </svg>`;
        }
      }

      // 2. 清涼冰品 (Glacial Ice Treats: 晶透冰塊、雙色脆皮冰棒、甜筒霜淇淋、富士山刨冰碗、冰晶雪花)
      if (skin === 'ice') {
        const charId = Math.abs(charIndex) % 5;
        if (charId === 0) {
          // 晶透冰塊 (Crystal Ice Cube)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <polygon points="20,6 33,13 20,20 7,13" fill="#e0f7fa" opacity="0.95"/>
            <polygon points="7,13 20,20 20,34 7,27" fill="#80deea" opacity="0.9"/>
            <polygon points="20,20 33,13 33,27 20,34" fill="#26c6da" opacity="0.95"/>
            <circle cx="13" cy="22" r="1.5" fill="#ffffff" opacity="0.8"/>
            <circle cx="27" cy="23" r="1.8" fill="#ffffff" opacity="0.8"/>
            <circle cx="20" cy="13" r="1.2" fill="#ffffff" opacity="0.85"/>
            <line x1="20" y1="6" x2="20" y2="20" stroke="#ffffff" stroke-width="1.2" opacity="0.9"/>
            <line x1="7" y1="13" x2="20" y2="20" stroke="#ffffff" stroke-width="1" opacity="0.8"/>
            <line x1="33" y1="13" x2="20" y2="20" stroke="#ffffff" stroke-width="1" opacity="0.8"/>
            <circle class="vivid-blush" cx="12" cy="25" r="2.2" fill="#4dd0e1"/>
            <circle class="vivid-blush" cx="28" cy="25" r="2.2" fill="#4dd0e1"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <ellipse cx="15" cy="20" rx="2" ry="2.6" fill="#006064"/>
              <circle cx="15.8" cy="19.2" r="0.8" fill="#ffffff"/>
              <ellipse cx="25" cy="20" rx="2" ry="2.6" fill="#006064"/>
              <circle cx="25.8" cy="19.2" r="0.8" fill="#ffffff"/>
            </g>
            <path d="M18.5,23.5 Q20,22 21.5,23.5" fill="none" stroke="#006064" stroke-width="1.2" stroke-linecap="round"/>
            <g class="vivid-glint" style="transform-origin: 32px 10px; animation-delay:${delay}s;">
              <polygon points="32,5 33.5,8.5 37,10 33.5,11.5 32,15 30.5,11.5 27,10 30.5,8.5" fill="#ffffff"/>
            </g>
          </svg>`;
        } else if (charId === 1) {
          // 雙色脆皮冰棒 (Twin Popsicle / Ice Pop)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <rect x="18" y="27" width="4" height="10" rx="2" fill="#f5cd79" stroke="#eccc68" stroke-width="0.8"/>
            <rect x="11" y="19" width="18" height="10" rx="3" fill="#ff4757"/>
            <rect x="11" y="16" width="18" height="4" fill="#ffffff"/>
            <path d="M11,18 L11,10 C11,6 29,6 29,10 L29,18 Z" fill="#00d2d3"/>
            <path d="M24,6 C26,8 29,7 30,11" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            <ellipse cx="28" cy="27" rx="1.5" ry="2.5" fill="#00d2d3" opacity="0.85"/>
            <circle class="vivid-blush" cx="14" cy="21" r="1.8" fill="#ff9ff3"/>
            <circle class="vivid-blush" cx="26" cy="21" r="1.8" fill="#ff9ff3"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="16" cy="18" r="1.8" fill="#1e272e"/>
              <circle cx="16.6" cy="17.4" r="0.7" fill="#ffffff"/>
              <circle cx="24" cy="18" r="1.8" fill="#1e272e"/>
              <circle cx="24.6" cy="17.4" r="0.7" fill="#ffffff"/>
            </g>
            <path d="M18.5,20 Q20,22 21.5,20" fill="none" stroke="#1e272e" stroke-width="1.1" stroke-linecap="round"/>
          </svg>`;
        } else if (charId === 2) {
          // 脆皮甜筒霜淇淋 (Waffle Soft-Serve Cone)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <polygon points="12,20 28,20 20,38" fill="#f39c12"/>
            <line x1="14" y1="23" x2="24" y2="31" stroke="#d35400" stroke-width="0.8"/>
            <line x1="16" y1="28" x2="22" y2="33" stroke="#d35400" stroke-width="0.8"/>
            <line x1="26" y1="23" x2="16" y2="31" stroke="#d35400" stroke-width="0.8"/>
            <line x1="24" y1="28" x2="18" y2="33" stroke="#d35400" stroke-width="0.8"/>
            <path d="M10,21 Q9,16 16,16 Q18,10 21,10 Q24,10 25,16 Q31,16 30,21 Z" fill="#ffffff"/>
            <path d="M12,20 Q16,17 20,18 Q24,17 28,20" fill="none" stroke="#70e1f5" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M19,10 Q20,3 23,6 Q21,8 20,10" fill="#ffffff"/>
            <circle cx="15" cy="16" r="0.9" fill="#ff4757"/>
            <circle cx="25" cy="16" r="0.9" fill="#00d2d3"/>
            <circle cx="20" cy="12" r="0.9" fill="#feca57"/>
            <circle class="vivid-blush" cx="13" cy="20" r="1.6" fill="#ff6b8b"/>
            <circle class="vivid-blush" cx="27" cy="20" r="1.6" fill="#ff6b8b"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <path d="M16,19 Q18,17 20,19" fill="none" stroke="#2c3e50" stroke-width="1.2" stroke-linecap="round"/>
              <path d="M20,19 Q22,17 24,19" fill="none" stroke="#2c3e50" stroke-width="1.2" stroke-linecap="round"/>
            </g>
            <path d="M18.5,22 Q20,24 21.5,22" fill="#ff6b8b"/>
            <g class="vivid-glint" style="transform-origin: 24px 6px; animation-delay:${delay}s;">
              <polygon points="24,3 25,5 27,6 25,7 24,9 23,7 21,6 23,5" fill="#ffffff"/>
            </g>
          </svg>`;
        } else if (charId === 3) {
          // 富士山刨冰碗 (Shaved Ice Bowl / Kakigōri)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <ellipse cx="20" cy="36" rx="9" ry="2" fill="#dff9fb" stroke="#00a8ff" stroke-width="0.8"/>
            <path d="M19,33 L21,33 L20,36 Z" fill="#00a8ff"/>
            <path d="M8,24 Q8,33 20,33 Q32,33 32,24 Z" fill="#c7ecee" stroke="#00a8ff" stroke-width="0.9"/>
            <ellipse cx="20" cy="24" rx="12" ry="3" fill="#ffffff" opacity="0.9"/>
            <path d="M9,24 Q7,13 20,9 Q33,13 31,24 Z" fill="#ffffff"/>
            <path d="M11,18 Q14,24 16,17 Q19,26 21,16 Q24,24 28,18 Q27,11 20,9 Q13,11 11,18 Z" fill="#ff3838"/>
            <circle cx="15" cy="14" r="0.8" fill="#ffffff" opacity="0.8"/>
            <circle cx="24" cy="15" r="0.8" fill="#ffffff" opacity="0.8"/>
            <g class="vivid-sprout">
              <path d="M20,9 Q23,4 25,6 Q23,8 20,9" fill="#2ed573"/>
            </g>
            <circle class="vivid-blush" cx="13" cy="25" r="2" fill="#ff7675"/>
            <circle class="vivid-blush" cx="27" cy="25" r="2" fill="#ff7675"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="16" cy="22" r="1.8" fill="#130f40"/>
              <circle cx="16.6" cy="21.3" r="0.7" fill="#ffffff"/>
              <circle cx="24" cy="22" r="1.8" fill="#130f40"/>
              <circle cx="24.6" cy="21.3" r="0.7" fill="#ffffff"/>
            </g>
            <path d="M18.5,25 Q20,27 21.5,25" fill="none" stroke="#130f40" stroke-width="1.1" stroke-linecap="round"/>
          </svg>`;
        } else {
          // 晶亮冰晶雪花 (Frosted Snowflake Star)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <line x1="20" y1="5" x2="20" y2="35" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
            <line x1="7" y1="12.5" x2="33" y2="27.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
            <line x1="7" y1="27.5" x2="33" y2="12.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
            <path d="M16,9 L20,12 L24,9 M16,31 L20,28 L24,31" fill="none" stroke="#70e1f5" stroke-width="1.6" stroke-linecap="round"/>
            <path d="M9,18 L13,19 L12,15 M31,22 L27,21 L28,25" fill="none" stroke="#70e1f5" stroke-width="1.6" stroke-linecap="round"/>
            <path d="M9,22 L13,21 L12,25 M31,18 L27,19 L28,15" fill="none" stroke="#70e1f5" stroke-width="1.6" stroke-linecap="round"/>
            <polygon points="20,13 25,16 27,20 25,24 20,27 15,24 13,20 15,16" fill="#00d2d3" opacity="0.85"/>
            <polygon points="20,15 23,17 24,20 23,23 20,25 17,23 16,20 17,17" fill="#ffffff"/>
            <g class="vivid-glint" style="transform-origin: 20px 20px; animation-delay:${delay}s;">
              <polygon points="20,8 22,18 32,20 22,22 20,32 18,22 8,20 18,18" fill="#ffffff"/>
            </g>
          </svg>`;
        }
      }

      // 3. 波霸軟糖 (Boba & Jellies: 珍珠奶茶杯、晶瑩小熊軟糖、水信玄餅、三色糰子)
      if (skin === 'boba') {
        const charId = Math.abs(charIndex) % 4;
        if (charId === 0) {
          // 珍珠奶茶杯 (Boba Milk Tea Cup)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <rect x="22" y="3" width="3.5" height="15" rx="1" fill="#ff4757" transform="rotate(15 22 3)"/>
            <ellipse cx="20" cy="14" rx="11" ry="2.5" fill="#ffffff" stroke="#ff7675" stroke-width="1"/>
            <path d="M10,14 L12,34 Q20,37 28,34 L30,14 Z" fill="#ffd8a8" stroke="#ffffff" stroke-width="1"/>
            <path d="M10.8,17 L12.2,33.5 Q20,36 27.8,33.5 L29.2,17 Z" fill="#f8b500" opacity="0.85"/>
            <circle cx="15" cy="32" r="2" fill="#2d1305"/>
            <circle cx="19" cy="33" r="2" fill="#2d1305"/>
            <circle cx="23" cy="32" r="2" fill="#2d1305"/>
            <circle cx="17" cy="29" r="1.8" fill="#2d1305"/>
            <circle cx="21" cy="29" r="1.8" fill="#2d1305"/>
            <circle cx="25" cy="30" r="1.8" fill="#2d1305"/>
            <circle cx="14.5" cy="31.5" r="0.6" fill="#ffffff" opacity="0.8"/>
            <circle cx="18.5" cy="32.5" r="0.6" fill="#ffffff" opacity="0.8"/>
            <circle class="vivid-blush" cx="14" cy="24" r="2" fill="#ff6b8b"/>
            <circle class="vivid-blush" cx="26" cy="24" r="2" fill="#ff6b8b"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="16.5" cy="21" r="1.8" fill="#2d1305"/>
              <circle cx="17.1" cy="20.3" r="0.7" fill="#ffffff"/>
              <circle cx="23.5" cy="21" r="1.8" fill="#2d1305"/>
              <circle cx="24.1" cy="20.3" r="0.7" fill="#ffffff"/>
            </g>
            <path d="M19,23 Q20,25 21,23" fill="none" stroke="#2d1305" stroke-width="1.1" stroke-linecap="round"/>
          </svg>`;
        } else if (charId === 1) {
          // 晶瑩小熊軟糖 (Crystal Gummy Bear)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <circle cx="12" cy="11" r="4.5" fill="#ff6b8b"/>
            <circle cx="12" cy="11" r="2.5" fill="#ffffff" opacity="0.6"/>
            <circle cx="28" cy="11" r="4.5" fill="#ff6b8b"/>
            <circle cx="28" cy="11" r="2.5" fill="#ffffff" opacity="0.6"/>
            <path d="M12,18 C9,18 8,24 10,26 C9,29 10,34 14,34 C16,34 18,32 20,32 C22,32 24,34 26,34 C30,34 31,29 30,26 C32,24 31,18 28,18 Z" fill="#ff6b8b"/>
            <circle cx="20" cy="17" r="8" fill="#ff6b8b"/>
            <ellipse cx="16" cy="14" rx="4" ry="2" fill="#ffffff" opacity="0.65" transform="rotate(-30 16 14)"/>
            <ellipse cx="16" cy="26" rx="2" ry="3.5" fill="#ffffff" opacity="0.5"/>
            <ellipse cx="20" cy="19" rx="3.5" ry="2.5" fill="#ffffff" opacity="0.9"/>
            <ellipse cx="20" cy="18" rx="1.5" ry="1.1" fill="#4a1525"/>
            <circle class="vivid-blush" cx="13" cy="19" r="1.8" fill="#ff4757"/>
            <circle class="vivid-blush" cx="27" cy="19" r="1.8" fill="#ff4757"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="16.5" cy="15.5" r="1.5" fill="#2d0b16"/>
              <circle cx="17" cy="15" r="0.5" fill="#ffffff"/>
              <circle cx="23.5" cy="15.5" r="1.5" fill="#2d0b16"/>
              <circle cx="24" cy="15" r="0.5" fill="#ffffff"/>
            </g>
          </svg>`;
        } else if (charId === 2) {
          // 蜜桃水信玄餅 (Peach Blossom Raindrop Cake)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <circle cx="20" cy="20" r="14" fill="#ffffff" opacity="0.4"/>
            <path d="M8,20 C8,10 32,10 32,20 C32,30 8,30 8,20 Z" fill="#ffeaa7" opacity="0.2"/>
            <ellipse cx="15" cy="13" rx="5" ry="2.5" fill="#ffffff" opacity="0.85" transform="rotate(-25 15 13)"/>
            <circle cx="28" cy="27" r="1.6" fill="#ffffff" opacity="0.7"/>
            <g class="vivid-sprout">
              <circle cx="20" cy="20" r="2.2" fill="#ffd32a"/>
              <circle cx="20" cy="15" r="3.2" fill="#ff7675" opacity="0.85"/>
              <circle cx="24" cy="18" r="3.2" fill="#ff7675" opacity="0.85"/>
              <circle cx="23" cy="23" r="3.2" fill="#ff7675" opacity="0.85"/>
              <circle cx="17" cy="23" r="3.2" fill="#ff7675" opacity="0.85"/>
              <circle cx="16" cy="18" r="3.2" fill="#ff7675" opacity="0.85"/>
            </g>
            <g class="vivid-glint" style="transform-origin: 26px 14px; animation-delay:${delay}s;">
              <polygon points="26,10 27,12.5 29.5,13 27,13.5 26,16 25,13.5 22.5,13 25,12.5" fill="#ffffff"/>
            </g>
          </svg>`;
        } else {
          // 花見三色糰子 (Hanami Dango Skewer)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <line x1="8" y1="32" x2="32" y2="8" stroke="#d2a679" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="13" cy="27" r="6" fill="#2ed573"/>
            <circle cx="11.5" cy="25" r="1.5" fill="#ffffff" opacity="0.6"/>
            <circle cx="20" cy="20" r="6.2" fill="#ffffff"/>
            <circle cx="18.5" cy="18" r="1.5" fill="#ffffff" opacity="0.8"/>
            <circle cx="27" cy="13" r="6" fill="#ff9ff3"/>
            <circle cx="25.5" cy="11" r="1.5" fill="#ffffff" opacity="0.6"/>
            <circle class="vivid-blush" cx="17" cy="21" r="1.2" fill="#ff7675"/>
            <circle class="vivid-blush" cx="23" cy="21" r="1.2" fill="#ff7675"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="18.5" cy="19" r="1" fill="#2d3436"/>
              <circle cx="21.5" cy="19" r="1" fill="#2d3436"/>
            </g>
            <path d="M19.5,21 Q20,22 20.5,21" fill="none" stroke="#2d3436" stroke-width="0.8"/>
          </svg>`;
        }
      }

      // 4. 濃醇可可 (Artisan Chocolates: 格子黑巧磚、金箔松露球、草莓白巧磚、榛果脆皮巧克球)
      if (skin === 'chocolate') {
        const charId = Math.abs(charIndex) % 4;
        if (charId === 0) {
          // 格子黑巧磚 (Chocolate Bar Tile)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <rect x="6" y="6" width="28" height="28" rx="3" fill="#3e2723" stroke="#5d4037" stroke-width="1"/>
            <rect x="8" y="8" width="11" height="11" rx="1.5" fill="#4e342e"/>
            <rect x="21" y="8" width="11" height="11" rx="1.5" fill="#4e342e"/>
            <rect x="8" y="21" width="11" height="11" rx="1.5" fill="#4e342e"/>
            <rect x="21" y="21" width="11" height="11" rx="1.5" fill="#4e342e"/>
            <polygon points="6,6 16,6 6,16" fill="#ffd700" stroke="#ffb142" stroke-width="0.8"/>
            <polygon points="6,6 13,6 6,13" fill="#ffffff" opacity="0.5"/>
            <line x1="10" y1="9" x2="17" y2="9" stroke="#ffffff" stroke-width="0.8" opacity="0.35"/>
            <circle class="vivid-blush" cx="13" cy="26" r="1.5" fill="#ff7675"/>
            <circle class="vivid-blush" cx="27" cy="26" r="1.5" fill="#ff7675"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="16" cy="24" r="1.5" fill="#ffffff"/>
              <circle cx="24" cy="24" r="1.5" fill="#ffffff"/>
            </g>
            <path d="M19,27 Q20,28.5 21,27" fill="none" stroke="#ffffff" stroke-width="0.9"/>
          </svg>`;
        } else if (charId === 1) {
          // 金箔奢華松露球 (Gold-Flaked Truffle)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <circle cx="20" cy="20" r="13" fill="#2d1305"/>
            <circle cx="20" cy="20" r="11" fill="#4a2211"/>
            <ellipse cx="16" cy="14" rx="4" ry="2" fill="#ffffff" opacity="0.3" transform="rotate(-30 16 14)"/>
            <polygon points="14,13 17,11 16,15" fill="#ffd700"/>
            <polygon points="23,15 26,17 25,13" fill="#ffd700"/>
            <polygon points="19,25 22,27 21,24" fill="#ffd700"/>
            <g class="vivid-glint" style="transform-origin: 24px 14px; animation-delay:${delay}s;">
              <polygon points="24,10 25,13 28,14 25,15 24,18 23,15 20,14 23,13" fill="#ffd700"/>
            </g>
            <circle class="vivid-blush" cx="14" cy="23" r="1.8" fill="#e17055"/>
            <circle class="vivid-blush" cx="26" cy="23" r="1.8" fill="#e17055"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="16.5" cy="20" r="1.5" fill="#ffffff"/>
              <circle cx="23.5" cy="20" r="1.5" fill="#ffffff"/>
            </g>
            <path d="M19,23 Q20,25 21,23" fill="none" stroke="#ffffff" stroke-width="1"/>
          </svg>`;
        } else if (charId === 2) {
          // 草莓白巧夾心磚 (Strawberry White Chocolate)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <rect x="7" y="7" width="26" height="26" rx="4" fill="#fff9e6" stroke="#f5e6cb" stroke-width="1.2"/>
            <rect x="9" y="9" width="22" height="22" rx="2" fill="#ffffff"/>
            <path d="M20,23 C17,19 14,19 14,22 C14,26 20,29 20,29 C20,29 26,26 26,22 C26,19 23,19 20,23 Z" fill="#eb4d4b"/>
            <circle cx="17" cy="22" r="0.6" fill="#ffd32a"/>
            <circle cx="23" cy="22" r="0.6" fill="#ffd32a"/>
            <circle cx="20" cy="25" r="0.6" fill="#ffd32a"/>
            <polygon points="12,12 14,11 13,14" fill="#6ab04c"/>
            <polygon points="27,13 29,15 26,16" fill="#6ab04c"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="16" cy="15" r="1.5" fill="#4a2e18"/>
              <circle cx="24" cy="15" r="1.5" fill="#4a2e18"/>
            </g>
            <circle class="vivid-blush" cx="13" cy="17" r="1.5" fill="#ff7675"/>
            <circle class="vivid-blush" cx="27" cy="17" r="1.5" fill="#ff7675"/>
          </svg>`;
        } else {
          // 榛果脆皮巧克球 (Rocher Sphere)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <circle cx="20" cy="20" r="13" fill="#543826"/>
            <circle cx="11" cy="15" r="2.2" fill="#b07d4b"/>
            <circle cx="28" cy="14" r="2.5" fill="#b07d4b"/>
            <circle cx="13" cy="26" r="2.3" fill="#b07d4b"/>
            <circle cx="27" cy="25" r="2.2" fill="#b07d4b"/>
            <circle cx="20" cy="9" r="2.4" fill="#b07d4b"/>
            <circle cx="20" cy="31" r="2.4" fill="#b07d4b"/>
            <path d="M12,18 Q20,13 28,18" fill="none" stroke="#331e10" stroke-width="2"/>
            <path d="M11,23 Q20,27 29,22" fill="none" stroke="#331e10" stroke-width="2"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="16" cy="19" r="1.6" fill="#ffffff"/>
              <circle cx="24" cy="19" r="1.6" fill="#ffffff"/>
            </g>
            <path d="M19,22 Q20,24 21,22" fill="none" stroke="#ffffff" stroke-width="1"/>
          </svg>`;
        }
      }

      // 5. 脆皮捏捏 (Crunchy Taba: 酥脆夾心餅、比利時鬆餅、糖霜泡芙、黑糖波霸)
      if (skin === 'crunchy') {
        const charId = Math.abs(charIndex) % 4;
        if (charId === 0) {
          // 酥脆餅乾仔 (Cookie Buddy - 咬一口齒痕與彩糖屑)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <path d="M29,6 C31,9 35,8 36,12 C34,14 36,18 34,20" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="9" cy="10" r="1.3" fill="#ffd166"/>
            <circle cx="31" cy="28" r="1.3" fill="#48dbfb"/>
            <circle cx="8" cy="29" r="1.3" fill="#66d79f"/>
            <circle cx="20" cy="8" r="1.3" fill="#ff6b8b"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="14" cy="18" r="3.2" fill="#3e2723"/>
              <circle cx="15.2" cy="16.8" r="1.2" fill="#ffffff"/>
              <circle cx="26" cy="18" r="3.2" fill="#3e2723"/>
              <circle cx="27.2" cy="16.8" r="1.2" fill="#ffffff"/>
            </g>
            <path d="M16,22 Q20,27 24,22" fill="#3e2723"/>
            <polygon points="18,22 20,22 19,23.8" fill="#ffffff"/>
            <circle class="vivid-blush" cx="10" cy="24" r="2.8" fill="#ff7675" opacity="0.6"/>
            <circle class="vivid-blush" cx="30" cy="24" r="2.8" fill="#ff7675" opacity="0.6"/>
          </svg>`;
        } else if (charId === 1) {
          // 格子比利時鬆餅 (Belgian Waffle)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <rect x="7" y="7" width="26" height="26" rx="4" fill="#e58e26" stroke="#b71540" stroke-width="0.8"/>
            <rect x="10" y="10" width="8" height="8" rx="1.5" fill="#f8c291"/>
            <rect x="22" y="10" width="8" height="8" rx="1.5" fill="#f8c291"/>
            <rect x="10" y="22" width="8" height="8" rx="1.5" fill="#f8c291"/>
            <rect x="22" y="22" width="8" height="8" rx="1.5" fill="#f8c291"/>
            <rect x="17" y="16" width="6" height="5" rx="1" fill="#fed330"/>
            <path d="M17,19 Q15,25 18,24" stroke="#e1b12c" stroke-width="1.5" fill="none"/>
            <circle class="vivid-blush" cx="12" cy="25" r="1.5" fill="#ff7675"/>
            <circle class="vivid-blush" cx="28" cy="25" r="1.5" fill="#ff7675"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="14" cy="14" r="1.6" fill="#3d2314"/>
              <circle cx="26" cy="14" r="1.6" fill="#3d2314"/>
            </g>
            <path d="M19,25 Q20,27 21,25" fill="none" stroke="#3d2314" stroke-width="1.2" stroke-linecap="round"/>
          </svg>`;
        } else if (charId === 2) {
          // 糖霜法式泡芙 (Choux Cream Puff)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <path d="M8,26 C6,16 34,16 32,26 Z" fill="#e58e26"/>
            <path d="M10,26 L30,26 Q20,33 10,26 Z" fill="#d35400"/>
            <path d="M11,22 Q16,24 20,21 Q24,24 29,22" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
            <circle cx="14" cy="13" r="0.8" fill="#ffffff"/>
            <circle cx="26" cy="14" r="0.8" fill="#ffffff"/>
            <circle cx="20" cy="11" r="0.8" fill="#ffffff"/>
            <circle class="vivid-blush" cx="13" cy="24" r="1.8" fill="#ff7675" opacity="0.8"/>
            <circle class="vivid-blush" cx="27" cy="24" r="1.8" fill="#ff7675" opacity="0.8"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <path d="M15,20 Q17,18 19,20" fill="none" stroke="#3d2314" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M21,20 Q23,18 25,20" fill="none" stroke="#3d2314" stroke-width="1.4" stroke-linecap="round"/>
            </g>
            <path d="M19,23 Q20,25 21,23" fill="none" stroke="#3d2314" stroke-width="1.2" stroke-linecap="round"/>
          </svg>`;
        } else {
          // 黑糖波霸 (Boba Bubble)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <ellipse cx="14" cy="11" rx="5" ry="2.5" fill="#ffffff" opacity="0.6" transform="rotate(-25 14 11)"/>
            <circle cx="28" cy="28" r="1.5" fill="#ffffff" opacity="0.5"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="14" cy="19" r="4" fill="#221122"/>
              <circle cx="15.5" cy="17" r="1.6" fill="#ffffff"/>
              <circle cx="12.5" cy="21" r="0.8" fill="#ffffff"/>
              <circle cx="26" cy="19" r="4" fill="#221122"/>
              <circle cx="27.5" cy="17" r="1.6" fill="#ffffff"/>
              <circle cx="24.5" cy="21" r="0.8" fill="#ffffff"/>
            </g>
            <circle class="vivid-blush" cx="8" cy="24" r="3" fill="#ff6b8b" opacity="0.75"/>
            <circle class="vivid-blush" cx="32" cy="24" r="3" fill="#ff6b8b" opacity="0.75"/>
            <path d="M18,24 Q20,27 22,24" fill="#221122"/>
          </svg>`;
        }
      }

      // 6. 萌萌動物 (Kawaii Buddies: 萌小喵、焦糖熊、甜心兔、呆萌雞、柴柴)
      if (skin === 'kawaii') {
        const charId = Math.abs(charIndex) % 5;
        if (charId === 0) {
          // 萌小喵 (Neko Kitten - 靈動眨眼與微動貓耳)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <polygon class="ear-left" style="animation-delay:${earDelay}s;" points="6,15 12,4 17,13" fill="#ffffff" opacity="0.95"/>
            <polygon points="8,14 12,7 15,13" fill="#ff8da1"/>
            <polygon class="ear-right" style="animation-delay:${earDelay}s;" points="23,13 28,4 34,15" fill="#ffffff" opacity="0.95"/>
            <polygon points="25,13 28,7 32,14" fill="#ff8da1"/>
            <ellipse class="vivid-blush" cx="9" cy="24" rx="3.5" ry="2" fill="#ff6b8b"/>
            <ellipse class="vivid-blush" cx="31" cy="24" rx="3.5" ry="2" fill="#ff6b8b"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <ellipse cx="14" cy="18" rx="3.5" ry="4.5" fill="#2b1a29"/>
              <circle cx="15.5" cy="16.5" r="1.5" fill="#ffffff"/>
              <circle cx="13" cy="20" r="0.8" fill="#ffffff"/>
              <ellipse cx="26" cy="18" rx="3.5" ry="4.5" fill="#2b1a29"/>
              <circle cx="27.5" cy="16.5" r="1.5" fill="#ffffff"/>
              <circle cx="25" cy="20" r="0.8" fill="#ffffff"/>
            </g>
            <path d="M16.5,21.5 Q18.2,24 20,22 Q21.8,24 23.5,21.5" fill="none" stroke="#2b1a29" stroke-width="1.3" stroke-linecap="round"/>
            <line x1="5" y1="20" x2="1" y2="19" stroke="#ffffff" stroke-width="1" opacity="0.8"/>
            <line x1="5" y1="23" x2="1" y2="24" stroke="#ffffff" stroke-width="1" opacity="0.8"/>
            <line x1="35" y1="20" x2="39" y2="19" stroke="#ffffff" stroke-width="1" opacity="0.8"/>
            <line x1="35" y1="23" x2="39" y2="24" stroke="#ffffff" stroke-width="1" opacity="0.8"/>
          </svg>`;
        } else if (charId === 1) {
          // 焦糖小熊 (Teddy Bear - 圓耳與小黑鼻)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <circle cx="10" cy="9" r="6" fill="#ffffff" opacity="0.95"/>
            <circle cx="10" cy="9" r="3.5" fill="#f8b090"/>
            <circle cx="30" cy="9" r="6" fill="#ffffff" opacity="0.95"/>
            <circle cx="30" cy="9" r="3.5" fill="#f8b090"/>
            <ellipse cx="20" cy="22" rx="7.5" ry="5.5" fill="#ffffff" opacity="0.85"/>
            <ellipse cx="20" cy="19.5" rx="2.5" ry="1.8" fill="#4a2e18"/>
            <path d="M20,21.3 L20,23.5 M17.5,23.5 Q20,26 22.5,23.5" fill="none" stroke="#4a2e18" stroke-width="1.3" stroke-linecap="round"/>
            <circle class="vivid-blush" cx="8" cy="23" r="3" fill="#ff7675"/>
            <circle class="vivid-blush" cx="32" cy="23" r="3" fill="#ff7675"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <ellipse cx="13" cy="16" rx="3" ry="3.5" fill="#2b1a29"/>
              <circle cx="14.2" cy="15" r="1.2" fill="#ffffff"/>
              <ellipse cx="27" cy="16" rx="3" ry="3.5" fill="#2b1a29"/>
              <circle cx="28.2" cy="15" r="1.2" fill="#ffffff"/>
            </g>
          </svg>`;
        } else if (charId === 2) {
          // 甜心兔兔 (Bunny - 長耳與愛心腮紅)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <ellipse class="ear-left" style="animation-delay:${earDelay}s;" cx="12" cy="7" rx="3.5" ry="8" fill="#ffffff" opacity="0.95"/>
            <ellipse cx="12" cy="7" rx="1.8" ry="5.5" fill="#ff99bb"/>
            <ellipse class="ear-right" style="animation-delay:${earDelay}s;" cx="28" cy="7" rx="3.5" ry="8" fill="#ffffff" opacity="0.95"/>
            <ellipse cx="28" cy="7" rx="1.8" ry="5.5" fill="#ff99bb"/>
            <path class="vivid-blush" d="M7,22 C6,20 8.5,19 9.5,20.5 C10.5,19 13,20 12,22 L9.5,24.5 Z" fill="#ff6b8b"/>
            <path class="vivid-blush" d="M28,22 C27,20 29.5,19 30.5,20.5 C31.5,19 34,20 33,22 L30.5,24.5 Z" fill="#ff6b8b"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <path d="M11,18 Q14,15 17,18" fill="none" stroke="#221122" stroke-width="1.8" stroke-linecap="round"/>
              <ellipse cx="26" cy="17.5" rx="3.5" ry="4.5" fill="#221122"/>
              <polygon points="26,14.5 27,17 29.5,17 27.5,18.5 28.5,21 26,19.5 23.5,21 24.5,18.5 22.5,17 25,17" fill="#ffffff"/>
            </g>
            <polygon points="19,20 21,20 20,21.5" fill="#ff6b8b"/>
            <path d="M18.5,22.5 Q20,24 21.5,22.5" fill="none" stroke="#221122" stroke-width="1.2" stroke-linecap="round"/>
          </svg>`;
        } else if (charId === 3) {
          // 呆萌小雞 (Piyoko Chick - 幼苗呆毛與橘嘴)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <g class="vivid-sprout">
              <path d="M20,10 Q17,4 14,7 Q16,10 19,10" fill="#ffffff" opacity="0.9"/>
              <path d="M20,10 Q23,4 26,7 Q24,10 21,10" fill="#ffffff" opacity="0.9"/>
            </g>
            <polygon points="17,20 23,20 20,24" fill="#ff7626"/>
            <circle class="vivid-blush" cx="8" cy="22" r="3.5" fill="#ff9f43" opacity="0.75"/>
            <circle class="vivid-blush" cx="32" cy="22" r="3.5" fill="#ff9f43" opacity="0.75"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="13" cy="18" r="3" fill="#1e1e24"/>
              <circle cx="14" cy="17" r="1.1" fill="#ffffff"/>
              <circle cx="27" cy="18" r="3" fill="#1e1e24"/>
              <circle cx="28" cy="17" r="1.1" fill="#ffffff"/>
            </g>
            <ellipse cx="4" cy="22" rx="2.5" ry="4" fill="#ffffff" opacity="0.85"/>
            <ellipse cx="36" cy="22" rx="2.5" ry="4" fill="#ffffff" opacity="0.85"/>
          </svg>`;
        } else {
          // 淘氣柴柴 (Shiba Inu - 吐舌笑臉)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <polygon class="ear-left" style="animation-delay:${earDelay}s;" points="7,14 13,5 18,13" fill="#ffffff" opacity="0.95"/>
            <polygon points="9,13 13,8 16,13" fill="#e89868"/>
            <polygon class="ear-right" style="animation-delay:${earDelay}s;" points="22,13 27,5 33,14" fill="#ffffff" opacity="0.95"/>
            <polygon points="24,13 27,8 31,13" fill="#e89868"/>
            <ellipse cx="14" cy="12" rx="1.6" ry="1.2" fill="#ffffff"/>
            <ellipse cx="26" cy="12" rx="1.6" ry="1.2" fill="#ffffff"/>
            <ellipse cx="20" cy="22" rx="6.5" ry="4.5" fill="#ffffff" opacity="0.9"/>
            <ellipse cx="20" cy="19.5" rx="2.2" ry="1.5" fill="#221122"/>
            <path d="M19,23.5 Q20,27 21,23.5" fill="#ff6b8b"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="13" cy="16.5" r="2.8" fill="#221122"/>
              <circle cx="14" cy="15.5" r="1.1" fill="#ffffff"/>
              <circle cx="27" cy="16.5" r="2.8" fill="#221122"/>
              <circle cx="28" cy="15.5" r="1.1" fill="#ffffff"/>
            </g>
          </svg>`;
        }
      }

      if (skin === 'gem') {
        const charId = Math.abs(charIndex) % 4;
        if (charId === 0) {
          // 閃爍心型粉鑽 (Heart Diamond + Glint)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <path d="M20,33 L9,19 C5,13 11,6 18,10 L20,12 L22,10 C29,6 35,13 31,19 Z" fill="#ffffff" opacity="0.35"/>
            <path d="M20,33 L14,19 L20,12 L26,19 Z" fill="#ffffff" opacity="0.6"/>
            <line x1="20" y1="12" x2="9" y2="19" stroke="#ffffff" stroke-width="1"/>
            <line x1="20" y1="12" x2="31" y2="19" stroke="#ffffff" stroke-width="1"/>
            <g class="vivid-glint" style="transform-origin: 12px 12px; animation-delay:${delay}s;">
              <polygon points="12,6 13.5,10.5 18,12 13.5,13.5 12,18 10.5,13.5 6,12 10.5,10.5" fill="#ffffff"/>
            </g>
          </svg>`;
        } else if (charId === 1) {
          // 八角皇家寶石 (Royal Octagon Sapphire)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <polygon points="12,6 28,6 34,12 34,28 28,34 12,34 6,28 6,12" fill="#ffffff" opacity="0.25"/>
            <polygon points="15,11 25,11 29,15 29,25 25,29 15,29 11,25 11,15" fill="#ffffff" opacity="0.6"/>
            <line x1="6" y1="12" x2="11" y2="15" stroke="#ffffff" stroke-width="1.2"/>
            <line x1="28" y1="6" x2="25" y2="11" stroke="#ffffff" stroke-width="1.2"/>
            <line x1="34" y1="28" x2="29" y2="25" stroke="#ffffff" stroke-width="1.2"/>
            <line x1="12" y1="34" x2="15" y2="29" stroke="#ffffff" stroke-width="1.2"/>
            <g class="vivid-glint" style="transform-origin: 26px 14px; animation-delay:${delay}s;">
              <polygon points="26,8 27.5,12.5 32,14 27.5,15.5 26,20 24.5,15.5 20,14 24.5,12.5" fill="#ffffff"/>
            </g>
          </svg>`;
        } else if (charId === 2) {
          // 璀璨星鑽 (Starlight Brilliant Cut)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <polygon points="12,12 28,12 34,18 20,34 6,18" fill="#ffffff" opacity="0.3"/>
            <polygon points="15,12 25,12 28,18 20,34 12,18" fill="#ffffff" opacity="0.65"/>
            <polygon points="12,18 28,18 20,34" fill="#ffffff" opacity="0.45"/>
            <g class="vivid-glint" style="transform-origin: 20px 18px; animation-delay:${delay}s;">
              <polygon points="20,8 21.5,15 28,18 21.5,21 20,28 18.5,21 12,18 18.5,15" fill="#ffffff"/>
            </g>
          </svg>`;
        } else {
          // 幻彩水晶球 (Mystic Prism Orb)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <circle cx="20" cy="20" r="13" fill="#ffffff" opacity="0.35"/>
            <ellipse cx="16" cy="14" rx="4" ry="2" fill="#ffffff" opacity="0.85" transform="rotate(-30 16 14)"/>
            <ellipse class="orbit-cw" cx="20" cy="20" rx="16" ry="6" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.85"/>
            <circle class="orbit-cw" cx="36" cy="20" r="1.8" fill="#ffffff"/>
            <g class="vivid-glint" style="transform-origin: 22px 22px; animation-delay:${delay}s;">
              <polygon points="22,16 23,20 27,22 23,24 22,28 21,24 17,22 21,20" fill="#ffffff"/>
            </g>
          </svg>`;
        }
      }

      if (skin === 'botanical') {
        const charId = Math.abs(charIndex) % 4;
        if (charId === 0) {
          // 嫩芽森林精靈 (Sprout Buddy)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <g class="vivid-sprout">
              <path d="M20,11 Q20,3 15,6 Q18,9 20,11" fill="#7bed9f" stroke="#2ed573" stroke-width="0.8"/>
              <path d="M20,11 Q21,2 26,5 Q23,8 20,11" fill="#7bed9f" stroke="#2ed573" stroke-width="0.8"/>
            </g>
            <circle class="vivid-blush" cx="9" cy="23" r="3" fill="#ff7675" opacity="0.7"/>
            <circle class="vivid-blush" cx="31" cy="23" r="3" fill="#ff7675" opacity="0.7"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <ellipse cx="14" cy="18" rx="3.2" ry="4.2" fill="#1e3725"/>
              <circle cx="15.2" cy="16.5" r="1.4" fill="#ffffff"/>
              <circle cx="13" cy="20" r="0.7" fill="#ffffff"/>
              <ellipse cx="26" cy="18" rx="3.2" ry="4.2" fill="#1e3725"/>
              <circle cx="27.2" cy="16.5" r="1.4" fill="#ffffff"/>
              <circle cx="25" cy="20" r="0.7" fill="#ffffff"/>
            </g>
            <path d="M18,22 Q20,24 22,22" fill="none" stroke="#1e3725" stroke-width="1.3" stroke-linecap="round"/>
          </svg>`;
        } else if (charId === 1) {
          // 幸運四葉草 (Fluttering Clover)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <g class="vivid-sprout">
              <path d="M20,20 C14,14 13,8 20,10 C27,8 26,14 20,20 Z" fill="#ffffff" opacity="0.9"/>
              <path d="M20,20 C14,26 13,32 20,30 C27,32 26,26 20,20 Z" fill="#ffffff" opacity="0.9"/>
              <path d="M20,20 C14,14 8,13 10,20 C8,27 14,26 20,20 Z" fill="#ffffff" opacity="0.9"/>
              <path d="M20,20 C26,14 32,13 30,20 C32,27 26,26 20,20 Z" fill="#ffffff" opacity="0.9"/>
              <circle cx="20" cy="20" r="2.5" fill="#ffd166"/>
            </g>
          </svg>`;
        } else if (charId === 2) {
          // 圓滾紅蘑菇 (Mushroom Sprite)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <path d="M7,20 C7,8 33,8 33,20 Z" fill="#ffffff" opacity="0.95"/>
            <circle cx="14" cy="14" r="2.2" fill="#ff4757"/>
            <circle cx="26" cy="14" r="2.2" fill="#ff4757"/>
            <circle cx="20" cy="11" r="1.8" fill="#ff4757"/>
            <path d="M13,20 L13,29 Q20,32 27,29 L27,20 Z" fill="#ffffff" opacity="0.85"/>
            <g class="vivid-eye-pair" style="animation-delay:${delay}s;">
              <circle cx="16" cy="24" r="1.8" fill="#2d3436"/>
              <circle cx="24" cy="24" r="1.8" fill="#2d3436"/>
            </g>
            <path d="M18.5,27 Q20,28.5 21.5,27" fill="none" stroke="#2d3436" stroke-width="1"/>
            <circle class="vivid-blush" cx="14" cy="26" r="1.8" fill="#ff7675" opacity="0.7"/>
            <circle class="vivid-blush" cx="26" cy="26" r="1.8" fill="#ff7675" opacity="0.7"/>
          </svg>`;
        } else {
          // 晨曦櫻花 (Sakura Blossom)
          return `<svg viewBox="0 0 40 40" class="vivid-sprite">
            <g class="vivid-sprout">
              <path d="M20,20 C18,10 22,8 20,6 C18,8 16,10 20,20" fill="#ffffff" opacity="0.9"/>
              <path d="M20,20 C11,15 10,19 8,19 C9,21 12,22 20,20" fill="#ffffff" opacity="0.9"/>
              <path d="M20,20 C13,27 16,29 15,31 C17,30 19,27 20,20" fill="#ffffff" opacity="0.9"/>
              <path d="M20,20 C27,27 24,29 25,31 C23,30 21,27 20,20" fill="#ffffff" opacity="0.9"/>
              <path d="M20,20 C29,15 30,19 32,19 C31,21 28,22 20,20" fill="#ffffff" opacity="0.9"/>
            </g>
            <circle class="vivid-core" cx="20" cy="20" r="3" fill="#ffd166"/>
          </svg>`;
        }
      }

      // cyber (未來光核)
      const charId = Math.abs(charIndex) % 4;
      if (charId === 0) {
        // 超導等離子反應爐 (Plasma Reactor)
        return `<svg viewBox="0 0 40 40" class="vivid-sprite">
          <circle class="orbit-cw" cx="20" cy="20" r="14" fill="none" stroke="#00f2fe" stroke-width="1.5" stroke-dasharray="12,6"/>
          <circle class="orbit-ccw" cx="20" cy="20" r="9" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="8,4"/>
          <circle class="vivid-core" cx="20" cy="20" r="4.5" fill="#00f2fe"/>
          <circle cx="20" cy="20" r="2" fill="#ffffff"/>
          <circle class="orbit-cw" cx="20" cy="6" r="1.5" fill="#ffffff"/>
          <circle class="orbit-cw" cx="20" cy="34" r="1.5" fill="#ffffff"/>
        </svg>`;
      } else if (charId === 1) {
        // 量子晶片電路 (Quantum Microchip Core)
        return `<svg viewBox="0 0 40 40" class="vivid-sprite">
          <polygon points="20,8 30,14 30,26 20,32 10,26 10,14" fill="none" stroke="#ffffff" stroke-width="1.5"/>
          <line x1="20" y1="8" x2="20" y2="3" stroke="#00f2fe" stroke-width="1.5"/>
          <line x1="30" y1="20" x2="36" y2="20" stroke="#00f2fe" stroke-width="1.5"/>
          <line x1="20" y1="32" x2="20" y2="37" stroke="#00f2fe" stroke-width="1.5"/>
          <line x1="10" y1="20" x2="4" y2="20" stroke="#00f2fe" stroke-width="1.5"/>
          <polygon class="vivid-core" points="20,13 25,17 25,23 20,27 15,23 15,17" fill="#00f2fe" opacity="0.85"/>
          <polygon points="20,13 18,20 22,20 20,27" fill="#ffffff"/>
        </svg>`;
      } else if (charId === 2) {
        // 全息瞄準儀 (Targeting Holo HUD)
        return `<svg viewBox="0 0 40 40" class="vivid-sprite">
          <circle class="orbit-cw" cx="20" cy="20" r="13" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="6,4,2,4"/>
          <line x1="20" y1="5" x2="20" y2="12" stroke="#ffffff" stroke-width="1.5"/>
          <line x1="20" y1="28" x2="20" y2="35" stroke="#ffffff" stroke-width="1.5"/>
          <line x1="5" y1="20" x2="12" y2="20" stroke="#ffffff" stroke-width="1.5"/>
          <line x1="28" y1="20" x2="35" y2="20" stroke="#ffffff" stroke-width="1.5"/>
          <circle class="vivid-core" cx="20" cy="20" r="3.5" fill="#ff007f"/>
          <circle cx="20" cy="20" r="1.2" fill="#ffffff"/>
        </svg>`;
      } else {
        // 次元立方光核 (Tesseract Core)
        return `<svg viewBox="0 0 40 40" class="vivid-sprite">
          <polygon points="20,8 31,14 31,26 20,32 9,26 9,14" fill="none" stroke="#ffffff" stroke-width="1.2"/>
          <line x1="20" y1="8" x2="20" y2="20" stroke="#ffffff" stroke-width="1"/>
          <line x1="31" y1="26" x2="20" y2="20" stroke="#ffffff" stroke-width="1"/>
          <line x1="9" y1="26" x2="20" y2="20" stroke="#ffffff" stroke-width="1"/>
          <circle class="vivid-core" cx="20" cy="20" r="5" fill="#00f2fe"/>
          <circle cx="20" cy="20" r="2" fill="#ffffff"/>
          <circle cx="20" cy="8" r="1.3" fill="#ffffff"/>
          <circle cx="31" cy="14" r="1.3" fill="#ffffff"/>
          <circle cx="31" cy="26" r="1.3" fill="#ffffff"/>
          <circle cx="20" cy="32" r="1.3" fill="#ffffff"/>
          <circle cx="9" cy="26" r="1.3" fill="#ffffff"/>
          <circle cx="9" cy="14" r="1.3" fill="#ffffff"/>
        </svg>`;
      }
    }
  };

  // --- 24 種經典豐富的方塊形狀庫 (Polyomino Patterns) ---
  const SHAPE_DEFINITIONS = [
    // 1 格
    { matrix: [[1]], name: 'dot', weight: 3 },
    // 2 格
    { matrix: [[1, 1]], name: 'h2', weight: 4 },
    { matrix: [[1], [1]], name: 'v2', weight: 4 },
    // 3 格 直/橫
    { matrix: [[1, 1, 1]], name: 'h3', weight: 5 },
    { matrix: [[1], [1], [1]], name: 'v3', weight: 5 },
    // 3 格 小 L 角
    { matrix: [[1, 0], [1, 1]], name: 'corner1', weight: 5 },
    { matrix: [[0, 1], [1, 1]], name: 'corner2', weight: 5 },
    { matrix: [[1, 1], [1, 0]], name: 'corner3', weight: 5 },
    { matrix: [[1, 1], [0, 1]], name: 'corner4', weight: 5 },
    // 4 格 直/橫 (長條)
    { matrix: [[1, 1, 1, 1]], name: 'h4', weight: 4 },
    { matrix: [[1], [1], [1], [1]], name: 'v4', weight: 4 },
    // 4 格 正方形 2x2
    { matrix: [[1, 1], [1, 1]], name: 'square2', weight: 5 },
    // 4 格 T 型
    { matrix: [[1, 1, 1], [0, 1, 0]], name: 't1', weight: 3 },
    { matrix: [[0, 1, 0], [1, 1, 1]], name: 't2', weight: 3 },
    { matrix: [[1, 0], [1, 1], [1, 0]], name: 't3', weight: 3 },
    { matrix: [[0, 1], [1, 1], [0, 1]], name: 't4', weight: 3 },
    // 4 格 Z / S 型
    { matrix: [[1, 1, 0], [0, 1, 1]], name: 'z1', weight: 3 },
    { matrix: [[0, 1, 1], [1, 1, 0]], name: 's1', weight: 3 },
    // 5 格 長條 (高難度但爽快)
    { matrix: [[1, 1, 1, 1, 1]], name: 'h5', weight: 2 },
    { matrix: [[1], [1], [1], [1], [1]], name: 'v5', weight: 2 },
    // 5 格 大 L 角
    { matrix: [[1, 0, 0], [1, 0, 0], [1, 1, 1]], name: 'bigL1', weight: 3 },
    { matrix: [[0, 0, 1], [0, 0, 1], [1, 1, 1]], name: 'bigL2', weight: 3 },
    { matrix: [[1, 1, 1], [1, 0, 0], [1, 0, 0]], name: 'bigL3', weight: 3 },
    { matrix: [[1, 1, 1], [0, 0, 1], [0, 0, 1]], name: 'bigL4', weight: 3 },
    // 3x3 大正方形 (大考驗)
    { matrix: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], name: 'square3', weight: 1 },
    // 2x3 小方塊
    { matrix: [[1, 1, 1], [1, 1, 1]], name: 'rect2x3', weight: 2 },
    { matrix: [[1, 1], [1, 1], [1, 1]], name: 'rect3x2', weight: 2 }
  ];

  // 讚美浮空文字評語
  const PRAISE_WORDS = [
    { text: 'CRISP!', sub: '酥脆極品', minCombo: 1 },
    { text: 'SQUISHY!', sub: '超捏感！', minCombo: 2 },
    { text: 'SWEET!', sub: '完美消除', minCombo: 3 },
    { text: 'AMAZING!', sub: '不可思議！', minCombo: 4 },
    { text: 'CRUNCHY BLAST!', sub: '脆皮大爆破！', minCombo: 5 },
    { text: 'UNBELIEVABLE!', sub: '神級連擊！', minCombo: 7 }
  ];

  // --- 遊戲狀態管理 ---
  class GameState {
    constructor() {
      this.board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
      this.score = 0;
      this.bestScore = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY_BEST), 10) || 0;
      this.combo = 0;
      this.maxCombo = 0;
      this.dockPieces = [null, null, null]; // 下方 3 個插槽
      this.undoHistory = []; // 歷史紀錄供復原
      this.undoRemaining = 2;
      this.bombRemaining = 1;
      this.refreshRemaining = 1;
      this.isBombMode = false;
      this.isGameOver = false;
      this.currentTheme = localStorage.getItem(LOCAL_STORAGE_KEY_THEME) || 'dessert';
      this.currentSkin = localStorage.getItem(LOCAL_STORAGE_KEY_SKIN) || 'dessert';
      this.selectedPieceIndex = null; // 點擊選取模式
    }

    saveHistory() {
      // 深度複製目前盤面與狀態
      const snapshot = {
        board: this.board.map(row => row.map(cell => (cell ? { ...cell } : null))),
        score: this.score,
        combo: this.combo,
        dockPieces: this.dockPieces.map(p => (p ? JSON.parse(JSON.stringify(p)) : null))
      };
      this.undoHistory.push(snapshot);
      if (this.undoHistory.length > 5) {
        this.undoHistory.shift();
      }
    }
  }

  // --- 粒子特效系統 (Particle FX Engine) ---
  class ParticleEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.running = false;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
      this.width = rect.width;
      this.height = rect.height;
    }

    // 觸發爆裂粒子
    burst(x, y, color, theme = 'crunchy', count = 18) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        const size = 4 + Math.random() * 7;
        const life = 0.5 + Math.random() * 0.5;

        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          gravity: 0.18,
          size: size,
          color: color,
          alpha: 1,
          life: life,
          maxLife: life,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.2,
          theme: theme,
          shapeType: Math.random() > 0.5 ? 'circle' : 'flake'
        });
      }

      if (!this.running) {
        this.running = true;
        this.loop();
      }
    }

    loop() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.vRot;
        p.life -= 0.016;
        p.alpha = Math.max(0, p.life / p.maxLife);

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fillStyle = p.color;

        if (p.theme === 'neon') {
          // 霓虹光芒
          this.ctx.shadowBlur = 8;
          this.ctx.shadowColor = p.color;
        }

        if (p.shapeType === 'flake') {
          // 酥脆碎屑方片
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        } else {
          // 圓形糖珠/果凍泡泡
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        requestAnimationFrame(() => this.loop());
      } else {
        this.running = false;
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
    }
  }

  // --- 主遊戲控制器 ---
  class BlockBlastApp {
    constructor() {
      this.state = new GameState();
      this.dom = {
        app: document.getElementById('game-app'),
        board: document.getElementById('game-board'),
        boardWrapper: document.getElementById('board-wrapper'),
        boardContainer: document.getElementById('board-container'),
        canvas: document.getElementById('fx-canvas'),
        floatContainer: document.getElementById('float-texts-container'),
        slots: [
          document.getElementById('slot-0'),
          document.getElementById('slot-1'),
          document.getElementById('slot-2')
        ],
        currentScore: document.getElementById('current-score'),
        bestScore: document.getElementById('best-score'),
        comboBadge: document.getElementById('combo-badge'),
        dragProxy: document.getElementById('drag-proxy'),
        btnTheme: document.getElementById('theme-btn'),
        btnSkin: document.getElementById('skin-btn'),
        btnSound: document.getElementById('sound-btn'),
        btnHelp: document.getElementById('help-btn'),
        btnUndo: document.getElementById('btn-undo'),
        btnBomb: document.getElementById('btn-bomb'),
        btnRefresh: document.getElementById('btn-refresh'),
        undoCount: document.getElementById('undo-count'),
        bombCount: document.getElementById('bomb-count'),
        refreshCount: document.getElementById('refresh-count'),
        gameOverModal: document.getElementById('game-over-modal'),
        helpModal: document.getElementById('help-modal'),
        modalFinalScore: document.getElementById('modal-final-score'),
        modalBestScore: document.getElementById('modal-best-score'),
        modalMaxCombo: document.getElementById('modal-max-combo'),
        btnRestart: document.getElementById('btn-restart'),
        btnCloseHelp: document.getElementById('btn-close-help'),
        btnGotIt: document.getElementById('btn-got-it'),
        themePills: document.querySelectorAll('.theme-pill'),
        skinPills: document.querySelectorAll('.skin-pill')
      };

      this.fx = new ParticleEngine(this.dom.canvas);
      this.cells = []; // 64 個 DOM 格子參照
      this.dragging = null; // 當前拖曳狀態物件

      this.init();
    }

    init() {
      this.applyTheme(this.state.currentTheme);
      this.applySkin(this.state.currentSkin);
      this.buildBoardDOM();
      this.updateScoreDisplay();
      this.bindEvents();
      this.spawnNewBatch();
      this.updatePowerupUI();
    }

    // 建立 8x8 棋盤 DOM
    buildBoardDOM() {
      this.dom.board.innerHTML = '';
      this.cells = [];
      for (let r = 0; r < BOARD_SIZE; r++) {
        const rowCells = [];
        for (let c = 0; c < BOARD_SIZE; c++) {
          const cell = document.createElement('div');
          cell.className = 'board-cell';
          cell.dataset.row = r;
          cell.dataset.col = c;
          this.dom.board.appendChild(cell);
          rowCells.push(cell);
        }
        this.cells.push(rowCells);
      }
    }

    // 主題切換
    applyTheme(theme) {
      this.state.currentTheme = theme;
      localStorage.setItem(LOCAL_STORAGE_KEY_THEME, theme);
      document.body.className = `theme-${theme}`;
      gameSound.setTheme(theme);

      // 自動協調最匹配的方塊造形風格
      const themeSkinMap = {
        dessert: 'dessert',
        ice: 'ice',
        crunchy: 'crunchy',
        jelly: 'boba',
        healing: 'dessert',
        neon: 'ice',
        wood: 'chocolate'
      };
      if (themeSkinMap[theme]) {
        this.applySkin(themeSkinMap[theme]);
      }

      // 更新選擇列的 Active 樣式
      this.dom.themePills.forEach(pill => {
        if (pill.dataset.theme === theme) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });

      // 重新渲染槽內方塊色彩
      this.renderDock();
    }

    // 方塊造形樣式切換 (Block Skin)
    applySkin(skinName) {
      this.state.currentSkin = skinName;
      localStorage.setItem(LOCAL_STORAGE_KEY_SKIN, skinName);
      document.body.dataset.skin = skinName;

      // 更新 Skin Pill 啟用狀態
      this.dom.skinPills.forEach(pill => {
        if (pill.dataset.skin === skinName) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });

      // 即時刷新棋盤上已放置方塊的生動精靈
      for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
          if (this.state.board[r][c]) {
            const charIdx = this.state.board[r][c].iconIndex || 0;
            const cellEl = this.cells[r][c];
            cellEl.innerHTML = `<span class="block-stamp">${VividStampFactory.getSVG(skinName, charIdx, r * 8 + c)}</span>`;
          }
        }
      }

      // 重新渲染下方插槽
      this.renderDock();
    }

    // 取得當前主題對應的方塊顏色庫
    getThemeColors() {
      const styles = getComputedStyle(document.body);
      return [
        styles.getPropertyValue('--c-1').trim() || '#ff6b8b',
        styles.getPropertyValue('--c-2').trim() || '#ff9f43',
        styles.getPropertyValue('--c-3').trim() || '#ffd166',
        styles.getPropertyValue('--c-4').trim() || '#48dbfb',
        styles.getPropertyValue('--c-5').trim() || '#66d79f',
        styles.getPropertyValue('--c-6').trim() || '#a29bfe',
        styles.getPropertyValue('--c-7').trim() || '#ff7675'
      ];
    }

    // 隨機抽選形狀、顏色與生動精靈
    generateRandomPiece() {
      // 根據權重隨機挑選
      const totalWeight = SHAPE_DEFINITIONS.reduce((acc, cur) => acc + cur.weight, 0);
      let rand = Math.random() * totalWeight;
      let chosen = SHAPE_DEFINITIONS[0];
      for (const shape of SHAPE_DEFINITIONS) {
        if (rand < shape.weight) {
          chosen = shape;
          break;
        }
        rand -= shape.weight;
      }

      const colors = this.getThemeColors();
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      const iconIndex = Math.floor(Math.random() * 5);

      return {
        matrix: chosen.matrix,
        rows: chosen.matrix.length,
        cols: chosen.matrix[0].length,
        colorIndex: colorIndex,
        color: color,
        iconIndex: iconIndex,
        id: Math.random().toString(36).substring(2, 9)
      };
    }

    // 生成新一輪待選方塊 (3 個槽位都空時觸發)
    spawnNewBatch() {
      for (let i = 0; i < 3; i++) {
        this.state.dockPieces[i] = this.generateRandomPiece();
      }
      this.renderDock();

      // 檢查是否還有任何可行步
      if (!this.hasAnyValidMove()) {
        this.triggerGameOver();
      }
    }

    // 渲染下方 3 個方塊插槽
    renderDock() {
      const colors = this.getThemeColors();

      this.dom.slots.forEach((slotEl, idx) => {
        slotEl.innerHTML = '';
        const piece = this.state.dockPieces[idx];

        if (!piece) {
          slotEl.classList.add('slot-empty');
          slotEl.classList.remove('selected');
          return;
        }

        slotEl.classList.remove('slot-empty');
        if (this.state.selectedPieceIndex === idx) {
          slotEl.classList.add('selected');
        } else {
          slotEl.classList.remove('selected');
        }

        const color = colors[piece.colorIndex % colors.length] || piece.color;
        piece.color = color;
        const svgHTML = VividStampFactory.getSVG(this.state.currentSkin, piece.iconIndex, idx * 3);

        // 建立微縮方塊預覽網格
        const shapeGrid = document.createElement('div');
        shapeGrid.className = 'piece-shape';
        shapeGrid.style.gridTemplateColumns = `repeat(${piece.cols}, 1fr)`;
        shapeGrid.style.gridTemplateRows = `repeat(${piece.rows}, 1fr)`;

        for (let r = 0; r < piece.rows; r++) {
          for (let c = 0; c < piece.cols; c++) {
            const block = document.createElement('div');
            block.className = 'mini-block';
            if (piece.matrix[r][c] === 1) {
              block.style.backgroundColor = color;
              block.style.color = color;
              block.innerHTML = `<span class="block-stamp">${svgHTML}</span>`;
            } else {
              block.style.visibility = 'hidden';
            }
            shapeGrid.appendChild(block);
          }
        }

        slotEl.appendChild(shapeGrid);
      });
    }

    // 檢查形狀是否能在 (startR, startC) 放置
    canPlace(matrix, startR, startC) {
      const rows = matrix.length;
      const cols = matrix[0].length;

      if (startR < 0 || startC < 0) return false;
      if (startR + rows > BOARD_SIZE || startC + cols > BOARD_SIZE) return false;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (matrix[r][c] === 1) {
            if (this.state.board[startR + r][startC + c] !== null) {
              return false;
            }
          }
        }
      }
      return true;
    }

    // 檢查目前下方剩餘的方塊中，是否還有任意一個可以在棋盤上放下
    hasAnyValidMove() {
      for (const piece of this.state.dockPieces) {
        if (!piece) continue;
        for (let r = 0; r <= BOARD_SIZE - piece.rows; r++) {
          for (let c = 0; c <= BOARD_SIZE - piece.cols; c++) {
            if (this.canPlace(piece.matrix, r, c)) {
              return true;
            }
          }
        }
      }
      return false;
    }

    // 放置方塊到棋盤
    placePiece(piece, startR, startC, slotIdx) {
      this.state.saveHistory();

      const colors = this.getThemeColors();
      const color = colors[piece.colorIndex % colors.length] || piece.color;
      let placedCount = 0;

      // 1. 填入狀態與 DOM
      for (let r = 0; r < piece.rows; r++) {
        for (let c = 0; c < piece.cols; c++) {
          if (piece.matrix[r][c] === 1) {
            const boardR = startR + r;
            const boardC = startC + c;
            const svgHTML = VividStampFactory.getSVG(this.state.currentSkin, piece.iconIndex, boardR * 8 + boardC);

            this.state.board[boardR][boardC] = {
              color: color,
              colorIndex: piece.colorIndex,
              iconIndex: piece.iconIndex
            };

            const cellEl = this.cells[boardR][boardC];
            cellEl.classList.add('filled', 'just-placed');
            cellEl.style.backgroundColor = color;
            cellEl.style.color = color;
            cellEl.innerHTML = `<span class="block-stamp">${svgHTML}</span>`;
            placedCount++;

            // 移除放置動畫類別避免後續衝突
            setTimeout(() => {
              cellEl.classList.remove('just-placed');
            }, 360);
          }
        }
      }

      // 清除插槽
      this.state.dockPieces[slotIdx] = null;
      this.state.selectedPieceIndex = null;
      this.renderDock();

      // 放置音效
      gameSound.playPlace();

      // 放置方塊基本分數
      this.addScore(placedCount * 10);

      // 2. 檢測行與列消除
      this.checkLineClears();

      // 3. 檢查是否需要刷新下一組方塊
      const remainingPieces = this.state.dockPieces.filter(p => p !== null);
      if (remainingPieces.length === 0) {
        setTimeout(() => {
          this.spawnNewBatch();
        }, 250);
      } else {
        // 檢查是否還有可行步
        if (!this.hasAnyValidMove()) {
          setTimeout(() => {
            this.triggerGameOver();
          }, 400);
        }
      }

      this.updatePowerupUI();
    }

    // 檢測滿行與滿列並進行消除
    checkLineClears() {
      const fullRows = [];
      const fullCols = [];

      // 檢查橫行
      for (let r = 0; r < BOARD_SIZE; r++) {
        let full = true;
        for (let c = 0; c < BOARD_SIZE; c++) {
          if (this.state.board[r][c] === null) {
            full = false;
            break;
          }
        }
        if (full) fullRows.push(r);
      }

      // 檢查直列
      for (let c = 0; c < BOARD_SIZE; c++) {
        let full = true;
        for (let r = 0; r < BOARD_SIZE; r++) {
          if (this.state.board[r][c] === null) {
            full = false;
            break;
          }
        }
        if (full) fullCols.push(c);
      }

      const totalLines = fullRows.length + fullCols.length;

      if (totalLines > 0) {
        // 連擊累計
        this.state.combo++;
        if (this.state.combo > this.state.maxCombo) {
          this.state.maxCombo = this.state.combo;
        }

        // 計算分數：行數倍率 x 連擊倍率
        let lineBonus = 100 * totalLines;
        if (totalLines === 2) lineBonus = 300;
        else if (totalLines === 3) lineBonus = 600;
        else if (totalLines >= 4) lineBonus = 1000 + (totalLines - 4) * 400;

        const comboMultiplier = 1 + (this.state.combo - 1) * 0.5;
        const earnedScore = Math.round(lineBonus * comboMultiplier);
        this.addScore(earnedScore);

        // 觸發音效與震動
        gameSound.playClear(totalLines, this.state.combo);

        // 棋盤震動特效
        const shakeClass = totalLines >= 3 ? 'shake-lg' : (totalLines === 2 ? 'shake-md' : 'shake-sm');
        this.dom.boardWrapper.classList.remove('shake-sm', 'shake-md', 'shake-lg');
        void this.dom.boardWrapper.offsetWidth; // 強制重繪重置動畫
        this.dom.boardWrapper.classList.add(shakeClass);
        setTimeout(() => this.dom.boardWrapper.classList.remove(shakeClass), 500);

        // 收集所有要消除的格子座標
        const clearedCoords = new Set();
        fullRows.forEach(r => {
          for (let c = 0; c < BOARD_SIZE; c++) clearedCoords.add(`${r},${c}`);
        });
        fullCols.forEach(c => {
          for (let r = 0; r < BOARD_SIZE; r++) clearedCoords.add(`${r},${c}`);
        });

        // 觸發爆破粒子與消除動畫
        clearedCoords.forEach(coord => {
          const [r, c] = coord.split(',').map(Number);
          const cellEl = this.cells[r][c];
          cellEl.classList.add('clearing');

          // 計算粒子中心座標
          const cellRect = cellEl.getBoundingClientRect();
          const canvasRect = this.dom.canvas.getBoundingClientRect();
          const pX = cellRect.left - canvasRect.left + cellRect.width / 2;
          const pY = cellRect.top - canvasRect.top + cellRect.height / 2;

          const cellColor = this.state.board[r][c]?.color || '#ffffff';
          this.fx.burst(pX, pY, cellColor, this.state.currentTheme, 8);
        });

        // 浮空評語與連擊文字
        this.showPraiseMessage(totalLines, this.state.combo, earnedScore);

        // 動畫結束後清空格子狀態
        setTimeout(() => {
          clearedCoords.forEach(coord => {
            const [r, c] = coord.split(',').map(Number);
            this.state.board[r][c] = null;
            const cellEl = this.cells[r][c];
            cellEl.className = 'board-cell';
            cellEl.style.backgroundColor = '';
            cellEl.style.color = '';
            cellEl.innerHTML = '';
          });

          // 消除後可能產生新空間，重新檢查遊戲結束狀態
          if (!this.hasAnyValidMove()) {
            this.triggerGameOver();
          }
        }, 320);

      } else {
        // 沒有消除，連擊中斷歸零
        this.state.combo = 0;
      }

      this.updateScoreDisplay();
    }

    // 浮動文字特效 (+Score, Combo, Praise)
    showPraiseMessage(lines, combo, score) {
      let praise = null;
      for (let i = PRAISE_WORDS.length - 1; i >= 0; i--) {
        if (combo >= PRAISE_WORDS[i].minCombo) {
          praise = PRAISE_WORDS[i];
          break;
        }
      }

      const msgEl = document.createElement('div');
      msgEl.className = 'float-msg';

      const rect = this.dom.boardWrapper.getBoundingClientRect();
      const parentRect = this.dom.boardContainer.getBoundingClientRect();
      msgEl.style.left = `${rect.left - parentRect.left + rect.width / 2}px`;
      msgEl.style.top = `${rect.top - parentRect.top + rect.height * 0.45}px`;

      let html = `<span class="primary-text">+${score}</span>`;
      if (combo > 1) {
        html += `<span class="sub-text">${praise ? praise.text : ''} COMBO x${combo}!</span>`;
      } else if (lines > 1) {
        html += `<span class="sub-text">${lines} LINES BLAST!</span>`;
      }

      msgEl.innerHTML = html;
      this.dom.floatContainer.appendChild(msgEl);

      setTimeout(() => {
        if (msgEl.parentElement) msgEl.parentElement.removeChild(msgEl);
      }, 1200);
    }

    // 更新計分看板
    addScore(points) {
      this.state.score += points;
      if (this.state.score > this.state.bestScore) {
        this.state.bestScore = this.state.score;
        localStorage.setItem(LOCAL_STORAGE_KEY_BEST, this.state.bestScore.toString());
      }
      this.updateScoreDisplay();

      // 分數面板彈跳反饋
      const currentCard = document.querySelector('.current-score-card');
      if (currentCard) {
        currentCard.classList.remove('score-pulse');
        void currentCard.offsetWidth;
        currentCard.classList.add('score-pulse');
      }
    }

    updateScoreDisplay() {
      this.dom.currentScore.textContent = this.state.score.toLocaleString();
      this.dom.bestScore.textContent = this.state.bestScore.toLocaleString();
      this.dom.comboBadge.textContent = `x${this.state.combo}`;

      if (this.state.combo > 1) {
        this.dom.comboBadge.classList.add('combo-active');
      } else {
        this.dom.comboBadge.classList.remove('combo-active');
      }
    }

    updatePowerupUI() {
      this.dom.undoCount.textContent = this.state.undoRemaining;
      this.dom.bombCount.textContent = this.state.bombRemaining;
      this.dom.refreshCount.textContent = this.state.refreshRemaining;

      this.dom.btnUndo.disabled = this.state.undoRemaining <= 0 || this.state.undoHistory.length === 0;
      this.dom.btnBomb.disabled = this.state.bombRemaining <= 0;
      this.dom.btnRefresh.disabled = this.state.refreshRemaining <= 0;

      if (this.state.isBombMode) {
        this.dom.btnBomb.classList.add('active-mode');
      } else {
        this.dom.btnBomb.classList.remove('active-mode');
      }
    }

    // --- 拖曳互動與落點計算 ---
    startDrag(slotIdx, clientX, clientY, isTouch = false) {
      const piece = this.state.dockPieces[slotIdx];
      if (!piece) return;

      gameSound.playPickUp();

      // 建立代理拖曳 DOM
      const proxyEl = this.dom.dragProxy;
      proxyEl.innerHTML = '';
      proxyEl.classList.add('active');

      const proxyShape = document.createElement('div');
      proxyShape.className = 'proxy-shape';
      proxyShape.style.gridTemplateColumns = `repeat(${piece.cols}, 1fr)`;
      proxyShape.style.gridTemplateRows = `repeat(${piece.rows}, 1fr)`;

      // 取得單個棋盤格子的即時寬高，以 1:1 縮放手感拖曳
      const sampleCellRect = this.cells[0][0].getBoundingClientRect();
      const cellSize = sampleCellRect.width;

      proxyShape.style.width = `${cellSize * piece.cols}px`;
      proxyShape.style.height = `${cellSize * piece.rows}px`;

      for (let r = 0; r < piece.rows; r++) {
        for (let c = 0; c < piece.cols; c++) {
          const b = document.createElement('div');
          b.className = 'proxy-block';
          b.style.width = `${cellSize}px`;
          if (piece.matrix[r][c] === 1) {
            b.style.backgroundColor = piece.color;
            b.style.color = piece.color;
            const proxySvg = VividStampFactory.getSVG(this.state.currentSkin, piece.iconIndex, slotIdx * 5);
            b.innerHTML = `<span class="block-stamp">${proxySvg}</span>`;
          } else {
            b.style.visibility = 'hidden';
          }
          proxyShape.appendChild(b);
        }
      }

      proxyEl.appendChild(proxyShape);

      // 隱藏槽內的方塊
      this.dom.slots[slotIdx].style.opacity = '0.25';

      // 手機觸控時：偏移 75px 往上，避免玩家手指擋住棋盤格子
      const touchOffsetY = isTouch ? 80 : (cellSize * piece.rows * 0.5);
      const touchOffsetX = (cellSize * piece.cols) * 0.5;

      this.dragging = {
        slotIdx: slotIdx,
        piece: piece,
        cellSize: cellSize,
        offsetX: touchOffsetX,
        offsetY: touchOffsetY,
        isTouch: isTouch,
        targetR: null,
        targetC: null
      };

      this.moveDragProxy(clientX, clientY);
    }

    moveDragProxy(clientX, clientY) {
      if (!this.dragging) return;

      const p = this.dragging.piece;
      const proxyX = clientX - this.dragging.offsetX;
      const proxyY = clientY - this.dragging.offsetY;

      this.dom.dragProxy.style.transform = `translate3d(${proxyX}px, ${proxyY}px, 0)`;

      // 計算在 8x8 棋盤上的對應落點
      const sampleCellRect = this.cells[0][0].getBoundingClientRect();
      const lastCellRect = this.cells[BOARD_SIZE - 1][BOARD_SIZE - 1].getBoundingClientRect();
      const cellStepX = (lastCellRect.right - sampleCellRect.left) / BOARD_SIZE;
      const cellStepY = (lastCellRect.bottom - sampleCellRect.top) / BOARD_SIZE;

      const relX = proxyX - sampleCellRect.left + (sampleCellRect.width * 0.5);
      const relY = proxyY - sampleCellRect.top + (sampleCellRect.height * 0.5);

      const targetC = Math.floor(relX / cellStepX);
      const targetR = Math.floor(relY / cellStepY);

      this.updateHoverPreview(targetR, targetC);
    }

    // 棋盤放置預覽高亮 (Ghost Preview & Line Clears Flash)
    updateHoverPreview(targetR, targetC, optionalPiece = null) {
      this.clearHoverPreview();

      const piece = optionalPiece || (this.dragging ? this.dragging.piece : null);
      if (!piece) return;

      if (this.canPlace(piece.matrix, targetR, targetC)) {
        if (this.dragging) {
          this.dragging.targetR = targetR;
          this.dragging.targetC = targetC;
        }

        // 高亮欲擺放位置
        for (let r = 0; r < piece.rows; r++) {
          for (let c = 0; c < piece.cols; c++) {
            if (piece.matrix[r][c] === 1) {
              const cell = this.cells[targetR + r][targetC + c];
              cell.classList.add('preview-valid');
              cell.style.backgroundColor = piece.color;
            }
          }
        }

        // 預測即將消除的行與列，讓它們高亮脈衝！
        this.previewSimulatedClears(piece, targetR, targetC);
      } else {
        if (this.dragging) {
          this.dragging.targetR = null;
          this.dragging.targetC = null;
        }
      }
    }

    // 模擬檢測若放入此方塊，哪些行/列會消除
    previewSimulatedClears(piece, targetR, targetC) {
      // 複製盤面計算
      const sim = this.state.board.map(row => [...row]);
      for (let r = 0; r < piece.rows; r++) {
        for (let c = 0; c < piece.cols; c++) {
          if (piece.matrix[r][c] === 1) {
            sim[targetR + r][targetC + c] = 1;
          }
        }
      }

      for (let r = 0; r < BOARD_SIZE; r++) {
        if (sim[r].every(v => v !== null)) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            this.cells[r][c].classList.add('preview-clear-line');
          }
        }
      }

      for (let c = 0; c < BOARD_SIZE; c++) {
        let full = true;
        for (let r = 0; r < BOARD_SIZE; r++) {
          if (sim[r][c] === null) {
            full = false;
            break;
          }
        }
        if (full) {
          for (let r = 0; r < BOARD_SIZE; r++) {
            this.cells[r][c].classList.add('preview-clear-line');
          }
        }
      }
    }

    clearHoverPreview() {
      for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
          const cell = this.cells[r][c];
          cell.classList.remove('preview-valid', 'preview-clear-line');
          if (this.state.board[r][c] === null) {
            cell.style.backgroundColor = '';
          }
        }
      }
    }

    endDrag() {
      if (!this.dragging) return;

      const { slotIdx, piece, targetR, targetC } = this.dragging;
      this.dom.dragProxy.classList.remove('active');
      this.dom.slots[slotIdx].style.opacity = '1';
      this.clearHoverPreview();

      if (targetR !== null && targetC !== null && this.canPlace(piece.matrix, targetR, targetC)) {
        this.placePiece(piece, targetR, targetC, slotIdx);
      }

      this.dragging = null;
    }

    // 觸發炸彈道具：清除以 (r, c) 為中心的 3x3
    triggerBombAt(centerR, centerC) {
      this.state.saveHistory();
      this.state.bombRemaining--;
      this.state.isBombMode = false;
      this.updatePowerupUI();

      gameSound.playBomb();

      // 畫面大晃動
      this.dom.boardWrapper.classList.remove('shake-sm', 'shake-md', 'shake-lg');
      void this.dom.boardWrapper.offsetWidth;
      this.dom.boardWrapper.classList.add('shake-lg');
      setTimeout(() => this.dom.boardWrapper.classList.remove('shake-lg'), 600);

      let clearedCount = 0;
      for (let r = Math.max(0, centerR - 1); r <= Math.min(BOARD_SIZE - 1, centerR + 1); r++) {
        for (let c = Math.max(0, centerC - 1); c <= Math.min(BOARD_SIZE - 1, centerC + 1); c++) {
          const cellEl = this.cells[r][c];
          cellEl.classList.add('clearing');

          const cellRect = cellEl.getBoundingClientRect();
          const canvasRect = this.dom.canvas.getBoundingClientRect();
          const pX = cellRect.left - canvasRect.left + cellRect.width / 2;
          const pY = cellRect.top - canvasRect.top + cellRect.height / 2;
          this.fx.burst(pX, pY, '#ff4757', this.state.currentTheme, 15);

          if (this.state.board[r][c] !== null) {
            clearedCount++;
            this.state.board[r][c] = null;
          }

          setTimeout(() => {
            cellEl.className = 'board-cell';
            cellEl.style.backgroundColor = '';
            cellEl.style.color = '';
            cellEl.innerHTML = '';
          }, 350);
        }
      }

      this.addScore(clearedCount * 50 + 100);
      this.showPraiseMessage(1, 1, clearedCount * 50 + 100);

      setTimeout(() => {
        if (!this.hasAnyValidMove()) {
          this.triggerGameOver();
        }
      }, 400);
    }

    // 復原一步
    undo() {
      if (this.state.undoRemaining <= 0 || this.state.undoHistory.length === 0) return;

      const previous = this.state.undoHistory.pop();
      this.state.board = previous.board;
      this.state.score = previous.score;
      this.state.combo = previous.combo;
      this.state.dockPieces = previous.dockPieces;
      this.state.undoRemaining--;

      // 重新繪製盤面與下方方塊
      for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
          const cell = this.cells[r][c];
          cell.className = 'board-cell';
          if (this.state.board[r][c] !== null) {
            cell.classList.add('filled');
            cell.style.backgroundColor = this.state.board[r][c].color;
            cell.style.color = this.state.board[r][c].color;
            const charIdx = this.state.board[r][c].iconIndex || 0;
            cell.innerHTML = `<span class="block-stamp">${VividStampFactory.getSVG(this.state.currentSkin, charIdx, r * 8 + c)}</span>`;
          } else {
            cell.style.backgroundColor = '';
            cell.style.color = '';
            cell.innerHTML = '';
          }
        }
      }

      this.renderDock();
      this.updateScoreDisplay();
      this.updatePowerupUI();
      gameSound.playPickUp();
    }

    // 刷新下方一組方塊
    refreshDockPieces() {
      if (this.state.refreshRemaining <= 0) return;
      this.state.saveHistory();
      this.state.refreshRemaining--;
      this.spawnNewBatch();
      this.updatePowerupUI();
      gameSound.playPlace();
    }

    // 遊戲結束結算
    triggerGameOver() {
      if (this.state.isGameOver) return;
      this.state.isGameOver = true;
      gameSound.playGameOver();

      this.dom.modalFinalScore.textContent = this.state.score.toLocaleString();
      this.dom.modalBestScore.textContent = this.state.bestScore.toLocaleString();
      this.dom.modalMaxCombo.textContent = `${this.state.maxCombo} COMBO`;
      this.dom.gameOverModal.classList.add('open');
    }

    // 重新開始新的一局
    restartGame() {
      this.dom.gameOverModal.classList.remove('open');
      this.state.board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
      this.state.score = 0;
      this.state.combo = 0;
      this.state.maxCombo = 0;
      this.state.undoHistory = [];
      this.state.undoRemaining = 2;
      this.state.bombRemaining = 1;
      this.state.refreshRemaining = 1;
      this.state.isBombMode = false;
      this.state.isGameOver = false;
      this.state.selectedPieceIndex = null;

      this.buildBoardDOM();
      this.updateScoreDisplay();
      this.updatePowerupUI();
      this.spawnNewBatch();
      gameSound.playPlace();
    }

    // --- 事件綁定 ---
    bindEvents() {
      // 1. 下方槽位拖曳與點選手勢 (滑鼠與觸控)
      this.dom.slots.forEach((slotEl, idx) => {
        // 滑鼠拖曳
        slotEl.addEventListener('mousedown', (e) => {
          if (e.button !== 0 || !this.state.dockPieces[idx]) return;
          this.startDrag(idx, e.clientX, e.clientY, false);
        });

        // 觸控拖曳 (手機必備)
        slotEl.addEventListener('touchstart', (e) => {
          if (!this.state.dockPieces[idx]) return;
          const touch = e.touches[0];
          this.startDrag(idx, touch.clientX, touch.clientY, true);
        }, { passive: false });

        // 點選切換選取模式
        slotEl.addEventListener('click', () => {
          if (!this.state.dockPieces[idx]) return;
          if (this.state.selectedPieceIndex === idx) {
            this.state.selectedPieceIndex = null;
          } else {
            this.state.selectedPieceIndex = idx;
            gameSound.playPickUp();
          }
          this.renderDock();
        });
      });

      // 首次互動時解鎖 AudioContext
      window.addEventListener('pointerdown', () => {
        gameSound.ensureContext();
      }, { once: true });

      // 全域移動與放開
      window.addEventListener('mousemove', (e) => {
        if (this.dragging) {
          this.moveDragProxy(e.clientX, e.clientY);
        }
      });

      window.addEventListener('mouseup', () => {
        if (this.dragging) {
          this.endDrag();
        }
      });

      window.addEventListener('touchmove', (e) => {
        if (this.dragging) {
          if (e.cancelable) e.preventDefault();
          const touch = e.touches[0];
          this.moveDragProxy(touch.clientX, touch.clientY);
        }
      }, { passive: false });

      window.addEventListener('touchend', () => {
        if (this.dragging) {
          this.endDrag();
        }
      });

      window.addEventListener('touchcancel', () => {
        if (this.dragging) {
          this.endDrag();
        }
      });

      // 2. 棋盤懸浮預覽 (點選擺放模式)
      this.dom.board.addEventListener('mousemove', (e) => {
        if (this.dragging) return;
        if (this.state.selectedPieceIndex !== null) {
          const cell = e.target.closest('.board-cell');
          if (!cell) return;
          const r = parseInt(cell.dataset.row, 10);
          const c = parseInt(cell.dataset.col, 10);
          const piece = this.state.dockPieces[this.state.selectedPieceIndex];
          if (piece) {
            this.updateHoverPreview(r, c, piece);
          }
        }
      });

      this.dom.board.addEventListener('mouseleave', () => {
        if (!this.dragging) {
          this.clearHoverPreview();
        }
      });

      // 3. 棋盤點擊：支援點擊放置或炸彈投放
      this.dom.board.addEventListener('click', (e) => {
        const cell = e.target.closest('.board-cell');
        if (!cell) return;
        const r = parseInt(cell.dataset.row, 10);
        const c = parseInt(cell.dataset.col, 10);

        // 如果在炸彈模式
        if (this.state.isBombMode) {
          this.triggerBombAt(r, c);
          return;
        }

        // 如果有選取方塊 (點選擺放模式)
        if (this.state.selectedPieceIndex !== null) {
          const piece = this.state.dockPieces[this.state.selectedPieceIndex];
          if (piece && this.canPlace(piece.matrix, r, c)) {
            this.placePiece(piece, r, c, this.state.selectedPieceIndex);
          }
        }
      });

      // 3. 頂部按鈕：主題切換
      this.dom.btnTheme.addEventListener('click', () => {
        const themes = ['dessert', 'ice', 'crunchy', 'jelly', 'healing'];
        const currentIdx = themes.indexOf(this.state.currentTheme);
        const nextTheme = themes[(currentIdx + 1) % themes.length];
        this.applyTheme(nextTheme);
        gameSound.playPickUp();
      });

      this.dom.themePills.forEach(pill => {
        pill.addEventListener('click', () => {
          const t = pill.dataset.theme;
          if (t) {
            this.applyTheme(t);
            gameSound.playPickUp();
          }
        });
      });

      // 方塊造形切換 (循環按鈕與標籤列)
      this.dom.btnSkin.addEventListener('click', () => {
        const skins = ['dessert', 'ice', 'boba', 'crunchy', 'chocolate'];
        const curIdx = skins.indexOf(this.state.currentSkin);
        const nextSkin = skins[(curIdx + 1) % skins.length];
        this.applySkin(nextSkin);
        gameSound.playPickUp();
      });

      this.dom.skinPills.forEach(pill => {
        pill.addEventListener('click', () => {
          const s = pill.dataset.skin;
          if (s) {
            this.applySkin(s);
            gameSound.playPickUp();
          }
        });
      });

      this.dom.btnSound.addEventListener('click', () => {
        const isMuted = gameSound.toggleMute();
        this.dom.btnSound.innerHTML = isMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
      });

      this.dom.btnHelp.addEventListener('click', () => {
        this.dom.helpModal.classList.add('open');
      });

      this.dom.btnCloseHelp.addEventListener('click', () => {
        this.dom.helpModal.classList.remove('open');
      });

      this.dom.btnGotIt.addEventListener('click', () => {
        this.dom.helpModal.classList.remove('open');
      });

      // 4. 技能道具按鈕
      this.dom.btnUndo.addEventListener('click', () => {
        this.undo();
      });

      this.dom.btnBomb.addEventListener('click', () => {
        if (this.state.bombRemaining <= 0) return;
        this.state.isBombMode = !this.state.isBombMode;
        this.updatePowerupUI();
        if (this.state.isBombMode) {
          gameSound.playPickUp();
        }
      });

      this.dom.btnRefresh.addEventListener('click', () => {
        this.refreshDockPieces();
      });

      // 5. 遊戲結束重新開始
      this.dom.btnRestart.addEventListener('click', () => {
        this.restartGame();
      });
    }
  }

  // 頁面載入完成後啟動遊戲
  window.addEventListener('DOMContentLoaded', () => {
    window.app = new BlockBlastApp();
  });
})();
