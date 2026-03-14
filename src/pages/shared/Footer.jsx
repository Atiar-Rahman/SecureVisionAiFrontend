import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content">

            <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                {/* Logo Section */}
                <div>
                    <Link className="text-2xl font-bold text-primary">
                        SecureVisionAI
                    </Link>

                    <p className="mt-3 text-sm opacity-70">
                        AI powered smart CCTV surveillance system that detects
                        suspicious activities in real-time.
                    </p>
                </div>

                {/* Product */}
                <div>
                    <h6 className="footer-title">Product</h6>
                    <div className="grid grid-cols-2">
                        <Link className="link link-hover">Features</Link>
                        <Link className="link link-hover">Pricing</Link>
                        <Link className="link link-hover">Security</Link>
                        <Link className="link link-hover">Integrations</Link>
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h6 className="footer-title">Company</h6>
                    <div className="grid grid-cols-2">
                        <Link to="/about" className="link link-hover">About</Link>
                        <Link to="/contact" className="link link-hover">Contact</Link>
                        <Link className="link link-hover">Careers</Link>
                        <Link className="link link-hover">Blog</Link>
                    </div>
                </div>

                {/* Legal */}
                <div>
                    <h6 className="footer-title">Legal</h6>
                    <div className="grid grid-cols-2">
                        

                        <Link className="link link-hover">Terms</Link>
                        <Link className="link link-hover">Privacy</Link>
                        <Link className="link link-hover">Cookies</Link>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">
                &copy; {new Date().getFullYear()} SecureVisionAI. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;