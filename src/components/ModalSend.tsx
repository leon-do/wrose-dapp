type Props = {
  to: string;
  amount: string;
  handleModalSend: (arg0: boolean) => void;
};

/**
 * @param {to, amount} props
 * @example <ModalSend to="0xAlice" amount="123" handleModalSend={handleModalSend} />
 */
const ModalSend: React.FunctionComponent<Props> = (props) => {
  const { to, amount, handleModalSend } = props;

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="flex min-h-full items-end justify-center text-center">
        <div className="absolute transform overflow-hidden rounded-lg bg-slate-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg font-medium leading-6" id="modal-title">
                Confirm
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-200 break-words">
                  By signing this message, you agree to send <br />
                  {amount} ROSE to {to}.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button onClick={() => handleModalSend(false)} type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium shadow-sm hover:bg-gray-500 focus:outline-none">
              Close
            </button>
            <button onClick={() => handleModalSend(true)} type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium shadow-sm hover:bg-sky-500 focus:outline-none">
              Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSend;
