export default function Modal({ discription }) {
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Open Modal
      </button>

      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box relative">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Press the <span className="font-bold">ESC</span> {discription}
          </p>
          <div className="modal-action">
            <button className="btn btn-success">Confirm</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
