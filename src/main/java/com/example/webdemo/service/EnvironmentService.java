package com.example.webdemo.service;

import com.example.webdemo.dao.Environment;
import com.example.webdemo.dao.mapper.EnvironmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 传感器数据服务，查询environment表
 */
@Service
@Transactional
public class EnvironmentService {

    @Autowired
    private EnvironmentMapper environmentMapper;

    public List<Environment> findBySQL( String begain, String end){
        return environmentMapper.selectByTimeRange (begain, end);
    }

    public List<Environment> findLastData(){
        return environmentMapper.selectOrderByDate ();
    }
}
