import * as Yup from 'yup'

const TimezoneSchema = Yup.object().shape({
    timezonefrom: Yup.string().required('Required'),
    timezoneto: Yup.string().required('Required')
})

export default TimezoneSchema