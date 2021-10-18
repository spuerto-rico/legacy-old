package com.legacynetwork;

import android.app.Application;

import com.facebook.react.ReactApplication;
import ui.fileselector.RNFileSelectorPackage;
import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.reactnativecommunity.checkbox.ReactCheckBoxPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rumax.reactnative.pdfviewer.PDFViewPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.horcrux.svg.SvgPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFileSelectorPackage(),
            new RNFileViewerPackage(),
            new DocumentPickerPackage(),
            new ReactNativeContacts(),
            new ReactCheckBoxPackage(),
            new VectorIconsPackage(),
            new PDFViewPackage(),
            new AsyncStoragePackage(),
            new ReactVideoPackage(),
            new SvgPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
