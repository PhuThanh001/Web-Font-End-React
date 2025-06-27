import HeaderComponent from '../HeaderComponent/HeaderComponet';
const LayoutWithHeader = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div>{children}</div>
    </div>
  );
};
export default LayoutWithHeader;
