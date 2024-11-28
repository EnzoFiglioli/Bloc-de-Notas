const homeView = (req, res, next) => {
    try {
        return res.render("home");
    } catch (error) {
        console.error("Error rendering the home view:", error);
        return next(error);
    }
};

const dashboardView = (req, res, next) => {
    try {
        return res.render("dashboard");
    } catch (error) {
        console.error("Error rendering the home view:", error);
        return next(error);
    }
};

const loginView = (req,res) => {
    try{
        return res.render("login");
    }catch{
        console.error("Error rendering the login view:", error);
        return next(error);
    }
}

const registerView = (req,res)=>{
    try{
        return res.render('register');
    }catch{
        console.error("Error rendering the register view:", error);
        return next(error);
    }
} 

module.exports = { homeView, dashboardView, loginView, registerView };
