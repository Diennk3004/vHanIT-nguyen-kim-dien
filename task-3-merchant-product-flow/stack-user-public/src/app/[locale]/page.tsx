import { BannerSearch, FeaturedProject, ProjectsForYou, Projects, News, Faq, Ads } from "@/components";
import stylesHomePage from "@/scss/home.module.scss";
import { Link } from "@/utils";
import { faBars, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
const HomePage = () => {
  return (
    <React.Fragment>
      {process.env.NEXT_PUBLIC_ENV}
      <BannerSearch />
      <div className={clsx(["max-w-7xl", "px-5", "max-md:block", "flex", "mx-auto", "mt-5", "gap-x-5"])}>
        <div className={clsx(["w-[70%]", "max-md:w-full"])}>
          <FeaturedProject />
          <ProjectsForYou />
          <Projects />
          <News />
          <Faq />
        </div>
        <div className={clsx(["w-[30%]", "max-md:w-full"])}>
          <Ads />
          <div className={clsx(["flex", "items-center", "gap-x-2", "border-b", "border-red-600", "mt-5"])}>
            <div className={clsx(["text-white", "bg-red-600", "px-2", "py-2"])}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h2 className={clsx(["uppercase", "text-md", "font-bold"])}>Danh mục bán</h2>
          </div>
          <div className={clsx(["border", "border-gray-200", "px-2", "py-2", stylesHomePage.menu])}>
            <ul>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà trong hẻm</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà mặt tiền</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán biệt thự, nhà liền kề</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán căn hộ, chung cư</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán phòng trọ, nhà trọ</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán văn phòng, kho xưởng</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán kho xưởng</Link>
              </li>
            </ul>
          </div>
          <div className={clsx(["flex", "items-center", "gap-x-2", "border-b", "border-red-600", "mt-5"])}>
            <div className={clsx(["text-white", "bg-red-600", "px-2", "py-2"])}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h2 className={clsx(["uppercase", "text-md", "font-bold"])}>Danh mục cho thuê</h2>
          </div>
          <div className={clsx(["border", "border-gray-200", "px-2", "py-2", stylesHomePage.menu])}>
            <ul>
              <li>
                <Link href={{ pathname: "/" }}>Cho thuê nhà trong hẻm</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Cho thuê nhà mặt tiền</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Cho thuê biệt thự, nhà liền kề</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Cho thuê căn hộ, chung cư</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Cho thuê phòng trọ, nhà trọ</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Cho thuê văn phòng, kho xưởng</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Cho thuê trang trại</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Cho thuê mặt bằng</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Cho thuê đất thổ cư, đất ở</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Cho thuê đất nền, đất liền kề</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Cho thuê đất nông lâm nghiệp</Link>
              </li>
            </ul>
          </div>
          <div className={clsx(["flex", "items-center", "gap-x-2", "border-b", "border-red-600", "mt-5"])}>
            <div className={clsx(["text-white", "bg-red-600", "px-2", "py-2"])}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h2 className={clsx(["uppercase", "text-md", "font-bold"])}>Video nhà đất</h2>
          </div>
          <div className={clsx(["px-2", "py-2", "border", "border-gray-200", "mt-1", "relative"])}>
            <Image src="/video-nha-dat.png" alt="Website" width={600} height={400} />
            <div className={clsx(["absolute", "top-0", "left-0", "w-full", "h-full", "bg-gray-900", "opacity-20", "px-2", "py-2"])}></div>
            <div className={clsx(["absolute", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center"])}>
              <button type="button" className={clsx(["text-white", "text-4xl"])}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
            </div>
          </div>
          <div className={clsx(["flex", "items-center", "gap-x-2", "border-b", "border-red-600", "mt-5"])}>
            <div className={clsx(["text-white", "bg-red-600", "px-2", "py-2"])}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h2 className={clsx(["uppercase", "text-md", "font-bold"])}>Nhà đất toàn quốc</h2>
          </div>
          <div className={clsx(["border", "border-gray-200", "px-2", "py-2", stylesHomePage.menu])}>
            <ul>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất tại Hà Nội</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Hồ Chí Minh</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Đà Nẵng</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Hải Phòng</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Cần Thơ</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất An Giang</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Bắc Ninh</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Cà Mau</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Cao Bằng</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất ĐakLak</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Điện Biên</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Đồng Nai</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Đồng Tháp</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Gia Lai</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Hà Tĩnh</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Hưng Yên</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Khánh Hòa</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Lai Châu</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Lâm Đồng</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Lạng Sơn</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Lào Cai</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Nghệ An</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Ninh Bình</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Phú Thọ</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Quảng Ngãi</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Quảng Ninh</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Quảng Trị</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Sơn La</Link>
              </li>
              <li>
                <Link href={{ pathname: "/" }}>Bán nhà đất Tây Ninh</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
