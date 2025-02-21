const core= require('@actions/core') // get inputs and set otputs
const exec= require('@actions/exec') // interact wththe cli

function run(){
    
    //Get inputs

    const bucket = core.getInput('bucketName', {required:true})
    const bucketRegion = core.getInput('bucketRegion', {required:true})
    const distFiles = core.getInput('distFiles', {required:true})

    // upload
    const s3Url= `s3://${bucket}`
    exec.exec(` aws s3 sync ${distFiles} ${s3Url} --region ${bucketRegion}`)
    
   const websiteURL = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
   core.setOutput("URL", websiteURL) //>> echo "URl=fvvv" >> $GITHUB_OUTPUT
}

run()