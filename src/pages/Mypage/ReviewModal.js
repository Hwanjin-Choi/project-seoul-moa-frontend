import ReviewSection from "../../components/Layout/ReviewSection.js";

const ReviewModal = ({ userName, reviewData, isOpen, setIsOpen, modalTitle, onEditClick }) => (
    <ReviewSection
        userName = {userName}
        reviewData={reviewData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle={modalTitle}
        showHeader={true}
        showEdit={true}
        onEditClick={onEditClick}
    />
);

export default ReviewModal;