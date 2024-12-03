package com.foodie.foodiebackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "t_users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userID;

    /* uncomment when reviews implemented
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;
     */

    /* uncomment when roles implemented
    //@JsonProperty("role")
    @Enumerated(EnumType.STRING)
    @Column(insertable = false, updatable = false) // Ensure the column is not duplicated
    private Role role;
     */
    
    private String phoneNumber;
    private String username;
    private String password;
    private String email;
    private String address;

}
