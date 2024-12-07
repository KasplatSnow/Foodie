package foodie.backend.repository;

public class AuthDTO {
    private Long userID;
    private String role;

    public AuthDTO(Long userID, String role) {
        this.userID = userID;
        this.role = role;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

