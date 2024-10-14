import Image from "next/image";
import Logo from "@/images/logo-large.png";

export default function Footer() {
  return (
    <footer className="bg-white p-8 border-t-2">
      <div className="container mx-auto">
        <div className="mb-6">
          <Image src={Logo} className="w-[9%]" alt="Logo" />
          <p className="mt-2 text-gray-600">Lorem ipsum odor amet, consectetuer adipiscing elit.</p>
          <p className="mt-2 text-gray-600">Gravida elit diam hendrerit dapibus diam velit non habitant potenti?</p>
        </div>

        <div className="flex justify-between pt-12">
          <div>
            <h3 className="text-lg font-semibold mb-2">About tripkolic</h3>
            <ul className="space-y-1 text-gray-600">
              <li>
                <a href="#" className="hover:text-orange-500">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  tripkolic Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Partnership</h3>
            <ul className="space-y-1 text-gray-600">
              <li>
                <a href="#" className="hover:text-orange-500">
                  Merchant sign up
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Merchant log in
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Affiliate Partnership
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Influencer Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Agent Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  tripkolic Partner Hub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Distribution & Marketing Enquiries
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Term of use</h3>
            <ul className="space-y-1 text-gray-600">
              <li>
                <a href="#" className="hover:text-orange-500">
                  General terms of use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Cookie policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Bug Bounty Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Animal Welfare Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-4">
          <p className="text-gray-600">© 2024 Tripkolic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
