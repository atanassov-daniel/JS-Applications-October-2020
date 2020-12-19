import {
    reg
} from "./registerPartials.js";

const home = async () => {
    await reg(); // otherwise there was a mistake that the helper "header" does not exist and so the templates didn;t work at all


};

const about = async () => {

};

export {
    home,
    about
};