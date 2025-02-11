export default ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className=" items-center flex justify-end">

                    <button
                        className=" text-gray-500 hover:text-gray-700"
                        onClick={()=>onClose(!isOpen)}
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};