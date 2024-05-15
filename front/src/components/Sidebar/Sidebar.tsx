import { Link } from 'react-router-dom';
import styles from './sidebar.module.scss';
import userImg from '../../assets/imgs/user_img.png';
import { navLinks } from '../../routes';
import EV_icon from '../../assets/icons/EV_icon.svg';
import GO_icon from '../../assets/icons/GO_icon.svg';
import JP_icon from '../../assets/icons/JP_icon.svg';
import notification_icon from '../../assets/icons/notification_icon.svg';

const NavLink = ({ name, to, icon }: any) => {
  return (
    <div className={styles.link_wrapp}>
      <img src={icon} alt="page_link" />
      <Link to={to}>{name}</Link>
    </div>
  );
};

export const recentlyUsed = [
  {
    name: 'Lorem Ipsum',
    icon: EV_icon,
    notification: true
  },
  {
    name: 'Lorem Ipsum',
    icon: EV_icon,
    notification: false
  },
  {
    name: 'Lorem Ipsum',
    icon: GO_icon,
    notification: false
  },
  {
    name: 'Lorem Ipsum',
    icon: JP_icon,
    notification: false
  },
  {
    name: 'Lorem Ipsum',
    icon: EV_icon,
    notification: false
  },
  {
    name: 'Lorem Ipsum',
    icon: GO_icon,
    notification: false
  },
  {
    name: 'Lorem Ipsum',
    icon: JP_icon,
    notification: false
  }
];

const RecentlyBox = ({ name, icon, notification }: any) => {
  return (
    <div className={styles.recently_box}>
      <div className="flex">
        <img src={icon} alt="icon" />
        <p className={styles.name}>{name}</p>
      </div>

      {notification && <img src={notification_icon} alt="notification" />}
    </div>
  );
};

const Sidebar = (): JSX.Element => {
  const loggedUser = localStorage.getItem('loggedUser');

  return (
    <div className={styles.wrapper}>
      <div className={styles.user_account}>
        <img src={userImg} alt="user_image" />

        <div className={styles.user_data}>
          <p className={styles.user_name}>{loggedUser || 'test'}</p>
          <p className={styles.user_tag}>@johnstraus</p>
        </div>
      </div>

      <div className={styles.navigation}>
        {navLinks.map((link: any) => (
          <NavLink
            name={link.name}
            to={link.route}
            icon={link.icon}
            key={link.route}
          />
        ))}
      </div>

      <p className={styles.recently_used}>NAJČEŠĆE KORIŠĆENO</p>

      {recentlyUsed.map((item: any, index) => (
        <RecentlyBox
          name={item.name}
          icon={item.icon}
          key={index}
          notification={item.notification}
        />
      ))}
    </div>
  );
};

export default Sidebar;
