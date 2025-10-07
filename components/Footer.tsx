import React from 'react';

type Page = 'privacyPolicy' | 'termsAndConditions' | 'faq';

const Logo: React.FC = () => (
    <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        </div>
        <span className="text-2xl font-bold text-white">Earnify</span>
    </div>
);

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full text-gray-400 hover:bg-indigo-600 hover:text-white transition duration-300">
        {children}
    </a>
);

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-12 lg:col-span-5">
            <Logo />
            <p className="mt-4 text-sm max-w-sm">
              Your trusted partner for earning online. We provide simple tasks and fast payouts.
            </p>
            <h4 className="font-bold text-white tracking-wider uppercase text-sm mt-8">Stay Updated</h4>
            <form className="mt-4 flex space-x-2 max-w-sm">
                <label htmlFor="email-newsletter" className="sr-only">Email address</label>
                <input id="email-newsletter" type="email" placeholder="Enter your email" required className="w-full px-4 py-2 text-sm text-slate-900 bg-slate-100 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500">
                    Go
                </button>
            </form>
          </div>

          <div className="md:col-span-4 lg:col-span-2 lg:col-start-7">
            <h4 className="font-bold text-white tracking-wider uppercase text-sm">Links</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><button onClick={() => onNavigate('privacyPolicy')} className="hover:text-white transition text-left">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('termsAndConditions')} className="hover:text-white transition text-left">Terms & Conditions</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-white transition text-left">FAQ</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="font-bold text-white tracking-wider uppercase text-sm">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="mailto:support@earnify.com" className="hover:text-white transition">support@earnify.com</a></li>
              <li><a href="tel:+15551234567" className="hover:text-white transition">+1 (555) 123-4567</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="font-bold text-white tracking-wider uppercase text-sm">Follow Us</h4>
            <div className="flex mt-4 space-x-4">
              <SocialIcon href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.23-2.06.088.625 1.958 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.521 2.008 1.958 1.245 4.287 1.965 6.786 1.965 7.9 0 12.312-6.422 11.942-12.654.837-.604 1.56-1.365 2.145-2.23z"/></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Earnify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;