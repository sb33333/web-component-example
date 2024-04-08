package home.demo.pkg1;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class Controller1 {

    @GetMapping("/{templateName}")
    public ModelAndView template (@PathVariable String templateName) {
        return new ModelAndView(templateName);
    }
    @PostMapping("/echo")
    @ResponseBody
    public Map<String, String[]> echo(HttpServletRequest request) {
        return request.getParameterMap();
    }
}
