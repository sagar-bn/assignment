import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class RuleController {

    @Autowired
    private RuleService ruleService;

    @PostMapping("/rule")
    public String createRule(@RequestBody Map<String, String> requestBody) {
        String ruleString = requestBody.get("ruleString");
        Node ast = ruleService.createRule(ruleString);
        return "Rule created successfully!";
    }

    @PostMapping("/evaluate")
    public Map<String, Boolean> evaluateRule(@RequestBody Map<String, Object> requestBody) {
        Node ruleAst = ruleService.createRule("(age > 30 AND department == 'Sales')");
        boolean result = ruleService.evaluateRule(ruleAst, requestBody);
        return Map.of("result", result);
    }
}
