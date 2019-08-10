package test;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Before;
import org.junit.Test;

import com.localhost.model.mapper.prescriptiondetailedMapper;
import com.localhost.model.mapper.registerMapper;
import com.localhost.model.mapper.registlevelMapper;

public class Test1 {

	//会话工厂
		private SqlSessionFactory sqlSessionFactory;

		@Before
		public void createSqlSessionFactory() throws IOException {
			// 配置文件
			String resource = "test.xml";
			
			InputStream inputStream = Resources.getResourceAsStream(resource);

			// 使用SqlSessionFactoryBuilder从xml配置文件中创建SqlSessionFactory
			sqlSessionFactory = new SqlSessionFactoryBuilder()
					.build(inputStream);

		}


		@Test
		public void testGetNumberOfVisits() throws Exception {
			//获取session
			SqlSession session = sqlSessionFactory.openSession();
			//获取mapper接口的代理对象
			registerMapper registerMapper0 = session.getMapper(registerMapper.class);
			//调用代理对象方法
			List<Integer> constantID = new ArrayList<Integer>();
			constantID.add(new Integer(11));
			constantID.add(new Integer(12));
			String startTime = "2018-08-09 16:25:58";
			String endTime = "2019-08-09 16:25:58";
			int result = registerMapper0.getNumberOfVisits(constantID, startTime, endTime);
			System.out.println(result);
			//关闭session
			session.close();		
		}
		
		@Test
		public void testGetFee() throws Exception {
			//获取session
			SqlSession session = sqlSessionFactory.openSession();
			//获取mapper接口的代理对象
			prescriptiondetailedMapper prescriptiondetailedMapper0 = session.getMapper(prescriptiondetailedMapper.class);
			//调用代理对象方法
			List<Integer> constantID = new ArrayList<Integer>();
			for (int i = 18; i < 30; i++) {
				constantID.add(i);
			}
			String startTime = "2018-08-09 16:25:58";
			String endTime = "2019-08-09 16:25:58";
			Integer result = prescriptiondetailedMapper0.getFee("西药", constantID, startTime, endTime);
			if (result == null) {
				System.out.println("test");
			} else {
				System.out.println(result);
			}
			//关闭session
			session.close();		
		}
		
		@Test
		public void testGetRegistrationFee() throws Exception {
			//获取session
			SqlSession session = sqlSessionFactory.openSession();
			//获取mapper接口的代理对象
			registlevelMapper registLevelMapper = session.getMapper(registlevelMapper.class);
			//调用代理对象方法
			BigDecimal result = new BigDecimal(0);
		    result = registLevelMapper.getRegistFee(1);
			System.out.println("" + result.toString());
			//关闭session
			session.close();		
		}
}
