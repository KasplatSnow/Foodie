package foodie.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class haello {

  @RequestMapping(value = "/", method = RequestMethod.GET)
  @ResponseBody
  public String requestMethodName() {
    return "hello cmpe202 2024";
  }
}
