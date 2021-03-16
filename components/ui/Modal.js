import { Modal } from "@supabase/ui";

export default function ModalOverlay({children, ...props}) {
    return (
        <Modal 
      hideFooter={true}
      className="w-full"
      overlayStyle="w-full"
      layout="vertical"
      size="medium"
      contentStyle="w-full"
      overlayClassName="w-full"
      visible={props.visible} 
      description={props.description}
      
      title={props.title}>
        {children}
      </Modal>
    )
}