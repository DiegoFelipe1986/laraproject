import React from 'react';

const TransferForm = ({ form, handleChange, handleSubmit }) => {

    const descriptionValue = form && typeof form === 'object' && form.description ? form.description : '';
    const amountValue = form && typeof form === 'object' && form.amount ? form.amount : '';

    const handleLocalSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <div className="container-form">
            <form onSubmit={handleLocalSubmit}>
                <div className="container-horizon">
                    <div className="child-div">
                        <label className='label-form'><strong>Description</strong></label>
                        <input
                            type="text"
                            className='input-transfer'
                            name='description'
                            placeholder='E.G Uber trip'
                            value={descriptionValue}
                            onChange={(e) => handleChange({ ...form, description: e.target.value })}
                        />
                    </div>

                    <div className="child-div">
                        <label className='label-form'><strong>Amount</strong></label>
                        <input
                            type="text"
                            className='input-transfer'
                            name='amount'
                            placeholder='$'
                            value={amountValue}
                            onChange={(e) => handleChange({ ...form, amount: e.target.value })}
                        />
                    </div>
                    <button className='button-send' type="submit">Send</button>
                </div>
            </form>
        </div>
    );
};

export default TransferForm;
