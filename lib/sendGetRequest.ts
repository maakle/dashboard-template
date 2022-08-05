import axios from 'axios';

const getRequest = (url: string) => axios.get(url).then((res) => res.data);

export default getRequest;
