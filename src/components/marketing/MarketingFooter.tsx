import { Link } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';

export const MarketingFooter = () => {
  return (
    <footer className="bg-[#0B0B0D] border-t border-[#2A2E35] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Montserrat'] uppercase">About</h3>
            <p className="text-[#B9BDC7] text-sm">
              MACHOBB is the leading gay dating and chat platform for adults seeking genuine connections without censorship.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Montserrat'] uppercase">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://Machobb.com/legalfoot.php" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#B9BDC7] hover:text-[#E53945] text-sm transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="https://Machobb.com/legalfoot.php" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#B9BDC7] hover:text-[#E53945] text-sm transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://Machobb.com/legalfoot.php" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#B9BDC7] hover:text-[#E53945] text-sm transition-colors"
                >
                  Cookies Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Montserrat'] uppercase">Language</h3>
            <LanguageSelector variant="footer" />
          </div>

          {/* Network */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Montserrat'] uppercase">Network</h3>
            <p className="text-[#B9BDC7] text-sm mb-3">Part of the OmoLink network</p>
            <img 
              src="https://storage1.machobb.com/mbb/c/5/f/6888e723d4f5c/black-omolink-mbb.png" 
              alt="OmoLink Network Partner"
              className="h-8"
            />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-[#2A2E35]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[#B9BDC7] text-sm text-center md:text-left">
              © {new Date().getFullYear()} MACHOBB. All rights reserved.
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSelector variant="compact" />
            </div>

            <div className="text-[#E53945] text-sm font-semibold">
              MACHOBB is for adults 18+ only
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
