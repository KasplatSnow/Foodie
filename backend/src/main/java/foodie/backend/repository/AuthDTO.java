package foodie.backend.repository;

/**
 * Data Transfer Object (DTO) for auth information.
 * This class is used to transfer user ID and role data between layers.
 */
public class AuthDTO {
    private Long userID;
    private String role;

    /**
     * Constructs a new AuthDTO with the specified user ID and role.
     * 
     * @param userID the ID of the user
     * @param role the role of the user 
     */
    public AuthDTO(Long userID, String role) {
        this.userID = userID;
        this.role = role;
    }

    /**
     * Getter for the user ID associated with this AuthDTO.
     *
     * @return the user ID
     */
    public Long getUserID() {
        return userID;
    }

    /**
     * Setter for the user ID associated with this AuthDTO.
     *
     * @param userID the user ID
     */
    public void setUserID(Long userID) {
        this.userID = userID;
    }

    /**
     * Getter for the role associated with this AuthDTO.
     *
     * @return the role
     */
    public String getRole() {
        return role;
    }

    /**
     * Setter for the role associated with this AuthDTO.
     *
     * @param role the role
     */
    public void setRole(String role) {
        this.role = role;
    }
}

