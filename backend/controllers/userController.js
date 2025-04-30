import axios from 'axios';

const getGithubUser=async(req,res)=>{

        try{
            const {userName}=req.params;
            const user = await axios.get(`https://api.github.com/users/${username}`);
            const repo= await axios.get(`https://api.github.com/users/${username}/repo`);

            res.json({
                    user:user.data,
                    repo:user.repo,
            })

        }catch(err){
            res.status(404).json({err:'user not found'});

        }
}

export default getGithubUser;