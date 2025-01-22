import Loading from "../components/Loading";
import TimeDisplay from "../components/TimeDisplay";

interface GuestLayoutProps {
  children: React.ReactNode;
  contentLoading?: boolean;
}

const backgroundStyle: React.CSSProperties = {
  background: "radial-gradient(circle, #1A0966 25%, #292733 100%)",
};

const GuestLayout: React.FC<GuestLayoutProps> = ({
  children,
  contentLoading = false,
}) => {
  return (
    <div className="min-h-screen max-w-full w-full" style={backgroundStyle}>
      <LayoutHeader />
      {contentLoading ? (
        <Loading className={"animate-spin min-h-[80vh] w-[60px] w-full m-auto"} color="#fff" />
      ) : (
        children
      )}
      <Footer />
    </div>
  );
};

const LayoutHeader: React.FC = () => {
  return (
    <div className="flex align-center justify-between flex-col sm:flex-row">
      <h1 className="text-4xl font-bold text-start text-white pl-4 py-4 sm:py-8 flex align-start flex-col sm:flex-row">
        YBC |{" "}
        <span className="text-lg text-[#888] text-start px-0 sm:px-4 my-2">
          Yahya Bekir Canevi
        </span>
      </h1>
      <TimeDisplay className="text-md text-[#d3d3d3] text-end px-4 mb-4 sm:my-auto" />
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#8882] text-white py-4">
      <div className="container mx-auto flex justify-center align-center space-x-6">
        {/* GitHub */}
        <a
          href="https://github.com/YahyaBekirCanevi"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <i className="fab fa-github text-xl"></i>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/yahyabekircanevi/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <i className="fab fa-linkedin text-xl"></i>
        </a>

        {/* Email */}
        <a
          href="mailto:yahyabekircanevi2@gmail.com"
          className="hover:text-gray-400"
        >
          <i className="fas fa-envelope text-xl"></i>
        </a>
      </div>
      <div className="text-center text-sm mt-4">
        © {new Date().getFullYear()} <strong>Yahya Bekir Canevi</strong>. All rights reserved.
      </div>
    </footer>
  );
};

export default GuestLayout;
