package com.psd.RealTimeSensorDataAnalyticsBackend.constants;

public enum UserEnum {
    
    IS_ADMIN("IS_ADMIN"),
    IS_USER("IS_USER");

    public final String label;

    private UserEnum(String label) {
        this.label = label;
    }

    public String toString(){
        return this.label;
    }

}
