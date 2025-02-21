import { useLanguage } from "@/providers/LanguageProvider";
import Modal, { ModalProps } from "../basic/Modal";
import Input from "../common/Input";

type ForgotpasswordModalProps = {

    modalProps: ModalProps;
};


const ForgotpasswordModal = ({
    modalProps
} : ForgotpasswordModalProps) => {
     const { t } = useLanguage();
    return (
        <Modal {...modalProps} widthMd="max-w-xl">
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-xl px-8 py-10 w-full max-w-md mx-4"
      >
        {/* Tiêu đề */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Enter Your Email Account</h2>

        <div className="relative" >
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <Input
            className=" !h-[44px] md:w-[400px] w-[350px] !rounded-xl pr-8"
            type="text"
            name="email"
            value={''}
            onChange={() => {
            }}
            placeholder={t('email-input')}
          />
           
          
        </div>
        
        

        {/* Điều hướng đến Login */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Remember password? {" "}
            <a
              href="#"
              className="relative text-blue-600 font-medium transition-all duration-300 ml-1
                before:absolute before:-bottom-1 before:left-1/2 before:w-0 before:h-[2px] 
                before:bg-blue-600 before:transition-all before:duration-300 
                hover:text-blue-700 hover:before:w-full hover:before:left-0 
                hover:scale-105"
            >
              Login
            </a>
          </p>
        </div>
      </div>
        </Modal>
    );
}
export default ForgotpasswordModal;