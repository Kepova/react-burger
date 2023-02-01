import { useState } from "react";

const useEnableModal = (initialState) => {
    const [isOpenModal, setIsOpenModal] = useState(initialState);

    const handleClickOpen = () => {
        setIsOpenModal(true);
    };

    const handleClickClose = () => {
        setIsOpenModal(false);
    };

    return { isOpenModal, handleClickOpen, handleClickClose };
}

export default useEnableModal;