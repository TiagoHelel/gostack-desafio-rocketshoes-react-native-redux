import {NavigationActions} from 'react-navigation'

let navigator

function setNavigatior(ref) {
    navigator = ref
}

function navigate(routeName, params) {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    )
}

export default {navigate, setNavigatior}
