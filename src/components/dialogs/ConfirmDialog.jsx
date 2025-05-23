const ConfirmDialog = ({ title, }) => {
    const modalOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    };

    const modalContentStyle = {
        background: "#fff",
        padding: "2rem",
        borderRadius: "4px",
        maxWidth: "500px",
        width: "90%",
    };
    return (
        <div className="modal-overlay" style={modalOverlayStyle}>
            <div className="modal-content" style={modalContentStyle}>
                <h3 className="mb-3">Confirm Deletion</h3>
                <p className="mb-4">
                    Are you sure you want to delete the client profile
                    This action cannot be undone.
                </p>
                <div className="d-flex justify-content-end gap-2">
                    <button
                        onClick={() => setShowModal(false)}
                        className="btn btn-secondary"
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteConfirmed}
                        className="btn btn-danger"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog;