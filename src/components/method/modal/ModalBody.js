import { Modal } from 'react-native';

export default function ModalBody({ visible, onRequestClose, animationType, transparent, children }) {
    return (
        <Modal visible={visible} animationType={animationType} onRequestClose={onRequestClose} transparent={transparent}>
            {children}
        </Modal>
    )
}