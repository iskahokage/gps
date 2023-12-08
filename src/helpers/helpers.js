export const handleAlert = (status, setAlert, msg) => {
    if (status === 200) {
        setAlert({ visible: true, variant: 'success', msg: 'Данные изменены'})
        setTimeout(() => { setAlert({ visible: false }) }, 2000)
    }else{
        setAlert({ visible: true, variant: 'danger', msg: msg.driver[0]})
        setTimeout(() => { setAlert({ visible: false }) }, 2000)
    }
}