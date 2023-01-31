import { useLocation } from 'react-router-dom';
import authService from '../../services/authService';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ConfirmAccount = () => {
    let query = useQuery();

    authService.confirmAccount(query.get("token")).then((response) => {
        window.location.href = '/';
    });

    return null;
};

export default ConfirmAccount;
