import EmptyComp from "../../components/ui/EmptyComp/EmptyComp";

const NotFound = () => {
  return (
    <EmptyComp
      titleEn="page not found"
      titleAr="الصفحة غير موجودة"
      isLink={true}
      linkLabelEn="back to home"
      linkLabelAr="العوده للرئيسيه"
      link=""
    />);
};

export default NotFound;
