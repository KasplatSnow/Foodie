public class Admin extends User{
    
    public Admin(long id, String name, String username, String password, String phoneNumber, String email, String role){
        super(id, name, username, password, phoneNumber, email, role = "Admin");
    }

    public void removeListing(long businessID){

    }

    public void removeListings(long[] businessIDs){

    }

    public void removeUser(){
        
    }
}
