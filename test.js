require("dotenv").config();

const vectorService = require("./src/services/vector.service");

(async () => {

    const collection =
        await vectorService.clearCollection();

    // console.log(collection.name);

})();