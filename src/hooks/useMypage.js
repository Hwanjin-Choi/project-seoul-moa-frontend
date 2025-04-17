import { useState } from "react";

const useMypage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCreateItem, setSelectedCreateItem] = useState(null);
  const [createContent, setCreateContent] = useState("");

  return {
    isModalOpen, setIsModalOpen,
    isClicked, setIsClicked,
    isReviewModalOpen, setIsReviewModalOpen,
    isEditModalOpen, setIsEditModalOpen,
    selectedReview, setSelectedReview,
    editedContent, setEditedContent,
    isCreateModalOpen, setIsCreateModalOpen,
    selectedCreateItem, setSelectedCreateItem,
    createContent, setCreateContent,
  };
};

export default useMypage;