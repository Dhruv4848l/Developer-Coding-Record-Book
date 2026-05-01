import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";
import { useCodeforcesStats } from "@/hooks/useCodeforcesStats";
import { useGFGStats } from "@/hooks/useGFGStats";
import { useCodeChefStats } from "@/hooks/useCodeChefStats";
import { useCodolioStats } from "@/hooks/useCodolioStats";
import { useAtCoderStats } from "@/hooks/useAtCoderStats";

export const CTASection = () => {
  const { data: leetcodeStats } = useLeetCodeStats("Ordinary_Coder_Here");
  const { data: codeforcesStats } = useCodeforcesStats("Ordinary_Coder_420");
  const { data: gfgStats } = useGFGStats("dhruvmaji8b4b");
  const { data: codechefStats } = useCodeChefStats("cooking_coder");
  const { data: hackerrankStats } = useCodolioStats("dhruvmajiever191");
  const { data: atcoderStats } = useAtCoderStats("MrCoder420");

  const lcSolved = leetcodeStats?.profile?.totalSolved || 0;
  const cfSolved = codeforcesStats?.profile?.problemsSolved || 0;
  const gfgSolved = gfgStats?.problemsSolved || 0;
  const ccSolved = codechefStats?.profile?.problemsSolved || 0;
  const hrSolved = hackerrankStats?.profile?.problemsSolved || 0;
  const acSolved = atcoderStats?.profile?.problemsSolved || 0;

  const totalSolved = lcSolved + cfSolved + gfgSolved + ccSolved + hrSolved + acSolved;
  const verifyCount = 6;

  return (
    <section id="leaderboard" className="cyber-theme relative pt-4 pb-0">
      <div className="w-[95%] max-w-[1600px] mx-auto">
        <div className="tf-sbar mb-0" style={{border: "1px solid var(--border1)", background: "rgba(10,8,20,0.8)"}}>
          <span className="tf-si"><div className="tf-dot on"></div> ALL SYSTEMS ONLINE</span>
          <span className="tf-si"><div className="tf-dot on"></div> {verifyCount} NODES VERIFIED</span>
          <span className="tf-si" style={{color: "var(--ember)"}}><div className="tf-dot warn"></div> {totalSolved} PROBLEMS CONQUERED</span>
          <span className="tf-si"><div className="tf-dot on"></div> KINGKONG_CODER : ACTIVE</span>
          <span className="tf-si" style={{color: "var(--t4)"}}>CODE VAULT : INTEL GRID : V4.0</span>
        </div>

        <div className="tf-strip">
          <a href="https://leetcode.com/u/Ordinary_Coder_Here/" target="_blank" rel="noopener noreferrer" className="tf-sc ts-lc">
            <div className="tf-sc-ico">💻</div>
            <span className="tf-sc-badge text-leetcode bg-leetcode/10">LeetCode</span>
            <div className="tf-sc-num">{lcSolved}</div>
            <div className="tf-sc-lbl">Problems Solved</div>
            <div className="tf-sc-ok">Verified</div>
            <span className="tf-sc-handle">@Ordinary_Coder_Here</span>
            <button className="tf-sc-btn">VIEW PROFILE ›</button>
            <div className="tf-sc-glow"></div>
          </a>
          
          <a href="https://codeforces.com/profile/Ordinary_Coder_420" target="_blank" rel="noopener noreferrer" className="tf-sc ts-cf">
            <div className="tf-sc-ico">⚡</div>
            <span className="tf-sc-badge text-codeforces bg-codeforces/10">Codeforces</span>
            <div className="tf-sc-num">{cfSolved}</div>
            <div className="tf-sc-lbl">Problems Solved</div>
            <div className="tf-sc-ok">Verified</div>
            <span className="tf-sc-handle">@Ordinary_Coder_420</span>
            <button className="tf-sc-btn">VIEW PROFILE ›</button>
            <div className="tf-sc-glow"></div>
          </a>

          <a href="https://www.geeksforgeeks.org/profile/dhruvmaji8b4b" target="_blank" rel="noopener noreferrer" className="tf-sc ts-gfg">
            <div className="tf-sc-ico">🌿</div>
            <span className="tf-sc-badge text-gfg bg-gfg/10">GeeksforGeeks</span>
            <div className="tf-sc-num">{gfgSolved}</div>
            <div className="tf-sc-lbl">Problems Solved</div>
            <div className="tf-sc-ok">Verified</div>
            <span className="tf-sc-handle">@dhruvmaji8b4b</span>
            <button className="tf-sc-btn">VIEW PROFILE ›</button>
            <div className="tf-sc-glow"></div>
          </a>

          <a href="https://www.codechef.com/users/cooking_coder" target="_blank" rel="noopener noreferrer" className="tf-sc ts-cc">
            <div className="tf-sc-ico">🍳</div>
            <span className="tf-sc-badge text-codechef bg-codechef/10">CodeChef</span>
            <div className="tf-sc-num">{ccSolved}</div>
            <div className="tf-sc-lbl">Problems Solved</div>
            <div className="tf-sc-ok">Verified</div>
            <span className="tf-sc-handle">@cooking_coder</span>
            <button className="tf-sc-btn">VIEW PROFILE ›</button>
            <div className="tf-sc-glow"></div>
          </a>

          <a href="https://www.hackerrank.com/profile/dhruvmajiever191" target="_blank" rel="noopener noreferrer" className="tf-sc ts-hr">
            <div className="tf-sc-ico">🏅</div>
            <span className="tf-sc-badge text-hackerrank bg-hackerrank/10">HackerRank</span>
            <div className="tf-sc-num">{hrSolved}</div>
            <div className="tf-sc-lbl">Problems Solved</div>
            <div className="tf-sc-ok">Verified</div>
            <span className="tf-sc-handle">@dhruvmajiever191</span>
            <button className="tf-sc-btn">VIEW PROFILE ›</button>
            <div className="tf-sc-glow"></div>
          </a>

          <a href="https://atcoder.jp/users/MrCoder420" target="_blank" rel="noopener noreferrer" className="tf-sc ts-ac">
            <div className="tf-sc-ico">🎯</div>
            <span className="tf-sc-badge text-atcoder bg-atcoder/10">AtCoder</span>
            <div className="tf-sc-num">{acSolved}</div>
            <div className="tf-sc-lbl">Problems Solved</div>
            <div className="tf-sc-ok">Verified</div>
            <span className="tf-sc-handle">@MrCoder420</span>
            <button className="tf-sc-btn">VIEW PROFILE ›</button>
            <div className="tf-sc-glow"></div>
          </a>
        </div>
      </div>
    </section>
  );
};
