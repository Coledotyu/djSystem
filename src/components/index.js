import SvgIcon from '@/components/SvgIcon';
import TheHeader from '@/components/common/TheHeader';

const components = {
  SvgIcon,
  TheHeader,
};

export default (Vue) => {
  Object.keys(components).forEach((key) =>
    Vue.component(key, components[key]));
};
