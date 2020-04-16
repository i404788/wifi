var request = require('request');


module.exports = ({ tokenRouter }) => {
  // getting the dogs route
  tokenRouter.get('/:code', async (ctx, next) => {
      const code = ctx.params.code;
      //console.log(code)

      const options = {
        'method': 'POST',
        'url': 'https://identity.fhict.nl/connect/token',
        'headers': {
          'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded']
        },
        form: {
          'grant_type': 'authorization_code',
          'code': code,
          'redirect_uri': 'https://i414719.hera.fhict.nl/wifiattendance',
          'client_id': 'i414719-fontyswifi',
          'client_secret': 'Rqa2hSKG50iVrdu1aapeBecljWoVIjJfQDyLTvr7'
        }
      };

      const token = await getToken(options);
      ctx.body = token;
      console.log("test :" + ctx.body);
  });
};

async function getToken(options) {
    const response = await request(options)
    //ctx.body = response.body;
    var parsedResponse = JSON.parse(response.body);
    console.log(parsedResponse.access_token)
    // ctx.body = parsedResponse.access_token;   
    // console.log(ctx.body);
    return parsedResponse.access_token;
  }
