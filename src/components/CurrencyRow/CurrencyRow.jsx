import React from 'react'
import ProjInput from '../UI/ProjInput/ProjInput';
import MySelect from '../UI/ProjSelect/ProjSelect';

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount,
        typeInput,
    } = props;


    return (
        <div className='select-group'>
            <ProjInput type={typeInput} value={amount.toString()} onChange={onChangeAmount} />
            <MySelect
                value={selectedCurrency}
                onChange={onChangeCurrency}
                options={
                    currencyOptions
                }
            />
        </div>
    )
}
