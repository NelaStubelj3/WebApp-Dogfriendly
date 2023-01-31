package hr.fer.DogFriendly;

import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;

//@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class DogFriendlyApplicationTests {

	WebDriver driver;

	@BeforeEach
	public void init() {
		driver = new ChromeDriver();
		System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\Chrome Driver\\chromedriver.exe");

		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
		driver.get("http://localhost:3000/");
	}

	@Test
	@Order(1)
	void testUserLoginGoodCreds() {
		driver.findElement(By.id("account-info")).click();
		driver.findElement(By.id("login")).click();

		WebElement element = driver.findElement(By.id("inputEmail"));
		element.sendKeys("mario.hosnjak009@gmail.com");

		element = driver.findElement(By.id("inputPassword"));
		element.sendKeys("lozinka");

		driver.findElement(By.className("button")).click();

		try {
			Thread.sleep(1000);
		} catch (Exception e) {
			e.printStackTrace();
		}

		String redirectedURL = driver.getCurrentUrl();
		boolean result = !(redirectedURL.contains("login"));

		assertTrue(result);
	}

	@Test
	@Order(2)
	void testEditUserInfo() {
		testUserLoginGoodCreds();
		driver.findElement(By.id("account-info")).click();
		driver.findElement(By.id("profileInfo")).click();
		driver.findElement(By.cssSelector("#editInfo > path:nth-child(2)")).click();

		WebElement element = driver.findElement(By.id("editUsername"));
		element.clear();
		element.sendKeys("AutomatedTestUsername");

		element = driver.findElement(By.id("editPassword"));
		element.sendKeys("lozinka");

		element = driver.findElement(By.id("editBio"));
		element.clear();
		element.sendKeys("AutomatedTestBio");

		driver.findElement(By.id("saveChanges")).click();

		try {
			Thread.sleep(2000);
		} catch (Exception e) {
			e.printStackTrace();
		}

		String resElement1 = driver.findElement(By.name("username")).getAttribute("innerHTML");
		String resElement2 = driver.findElement(By.name("bio")).getAttribute("innerHTML");

		assertTrue(resElement1.contains("AutomatedTestUsername") && resElement2.contains("AutomatedTestBio"));
	}

	@Test
	@Order(3)
	void testAddReview() {
		testUserLoginGoodCreds();
		driver.findElement(By.id("search")).click();

		WebElement element = driver.findElement(By.id("search"));
		element.sendKeys("Proba");

		driver.findElement(By.id("0")).click();
		driver.findElement(By.className("review-location-btn")).click();
		driver.findElement(By.cssSelector("span:nth-child(4)")).click();

		element = driver.findElement(By.cssSelector("textarea"));
		element.sendKeys("Automated Test Review");

		driver.findElement(By.id("submitReview")).click();

		String reviewRes = driver.findElement(By.name("reviewText")).getAttribute("innerHTML");

		assertTrue(reviewRes.contains("Automated Test Review"));
	}
}
