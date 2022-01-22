import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {
  ViewerOptions,
  ViewerInitializedEvent,
  DocumentChangedEvent,
  SelectionChangedEventArgs,
  Extension
} from "ng2-adsk-forge-viewer";

// import { MyExtension } from "./extension";
import { ForgeViewerService } from "./forge-viewer-frame.service"
// Insert a token and a document URN here
// Then refresh the app
const DOCUMENT_URN = btoa("urn:adsk.objects:os.object:rqodjejxqjw7ryc4lzy4offvc0apa4jl_tutorial_bucket/projeto%20simples.rvt");

const OBJECT_URL = "https://developer.api.autodesk.com/oss/v2/buckets/rqodjejxqjw7ryc4lzy4offvc0apa4jl_tutorial_bucket"

const AUTH_URL = "https://developer.api.autodesk.com/authentication/v1/authenticate"
const TOKEN_KEY = "auth-token-key"
const CREDENTIALS = {
  client_id: "RqOdjEJxQjw7rYC4lzY4oFfvc0Apa4Jl",
  client_secret: "UO3oOV1SrxI9VpAR",
  grant_type: "client_credentials",
  scope: "data:read data:write data:create bucket:create bucket:read"
}

@Component({
  selector: 'app-forge-viewer-frame',
  templateUrl: './forge-viewer-frame.component.html',
  styleUrls: ['./forge-viewer-frame.component.css']
})
export class ForgeViewerFrameComponent implements OnInit {
  name = "Angular Forge Viewer";
  public viewerOptions: any;
  public documentId: string | undefined;
  public project: any;
  public results: any;
  constructor(private http: HttpClient) { }

  public async ngOnInit() {
    const isAuthenticated = this.isAuthenticated()
    if (!isAuthenticated)
      await this.authenticateUser()

    await this.http.get("http://localhost:9090/execut/projects/1")
      .toPromise()
      .then(resp => {

        this.project = resp
        console.log(this.project)
      }).catch(err => {
        console.log(err)
      });


    await this.http.get("http://localhost:9090/execut/results/1")
      .toPromise()
      .then(resp => {
        this.results = [resp]
        console.log(this.results)
      }).catch(err => {
        console.log(err)
      });

    this.viewerOptions = this.initViewerOptions();
  }
  private initViewerOptions() {
    return {
      initializerOptions: {
        env: "AutodeskProduction",
        getAccessToken: (
          onGetAccessToken: (token: string, expire: number) => void
        ) => {
          const expireTimeSeconds = 60 * 30;
          const token = this.getToken()
          onGetAccessToken(token, expireTimeSeconds);
        },
        api: "derivativeV2",
        enableMemoryManagement: true
      },
      // viewerConfig: {
      //   extensions: ["Autodesk.DocumentBrowser", MyExtension.extensionName],
      //   theme: "bim-theme"
      // },
      // onViewerScriptsLoaded: () => {
      //   // Register a custom extension
      //   Extension.registerExtension(MyExtension.extensionName, MyExtension);
      // },
      onViewerInitialized: (args: ViewerInitializedEvent) => {
        const URN = btoa(this.project.projectGeneralInfo.objectInfo.objectId)
        args.viewerComponent.DocumentId = URN;
      },
      // showFirstViewable: false,
      // headlessViewer: true,
      // Set specific version number
      //version: "7.41"
    }
  }
  // public selectionChanged() {
  // }
  public async selectionChanged(event: any) {
    if (event.nodeArray.length > 0) {
      const mapList = await this.getUUIDFromSelectedItens(event)
      
      console.log("event", event);
      console.log("------------------------------------");
      console.log("mapList", mapList);
    }

  }

  public async getUUIDFromSelectedItens(event: any){
    const dbIdArray = event.dbIdArray as number[]
    const mapList = await this.getExternalIds(event.model)
    const keys = Object.keys(mapList)
    return keys.filter(key => dbIdArray.includes(mapList[key]))
  }

  public getExternalIds(
    model: Autodesk.Viewing.Model
  ): Promise<{ [key: string]: number }> {
    return new Promise(function (resolve, reject) {
      model.getExternalIdMapping(resolve, reject);
    });
  }
  public async getExternalIdsMap(event: any) {
    var mapList: any;
    await this.getExternalIds(event.model)
      .then(value => mapList = value);
    return mapList;
  }

  public documentChanged(event: any) {
    console.log("documentChanged", event);
  }
  public documentOpened(event: any) {
    console.log("documentOpened", event);
  }
  public onNavigationModeEvent(event: any) {
    console.log("documentOpened", event);
  }
  public getAllDbIds(viewer: any) {
    var instanceTree = viewer.model.getData().instanceTree;

    var allDbIdsStr = Object.keys(instanceTree.nodeAccess.dbIdToIndex);

    return allDbIdsStr.map(function (id) { return parseInt(id) });
  }

  public async authenticateUser() {

    const params = new URLSearchParams()
    params.append("client_id", CREDENTIALS.client_id)
    params.append("client_secret", CREDENTIALS.client_secret)
    params.append("grant_type", CREDENTIALS.grant_type)
    params.append("scope", CREDENTIALS.scope)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    const promise = this.http.post(AUTH_URL, params, config).toPromise();
    await promise.then(function (response: any) {
      // console.log(response)
      localStorage.setItem(TOKEN_KEY, response.access_token)
      // console.log(response);
    }).catch(function (error) {
      // console.log(error);
    });
  }

  public isAuthenticated() {
    const token = localStorage.getItem(TOKEN_KEY)
    return token ? true : false
  }

  public getToken() {
    return localStorage.getItem(TOKEN_KEY) || ""
  }

  public async publicuploadFile(file: any) {

    const fileLength = file[0].size
    const fileName = file[0].name
    const url = `${OBJECT_URL}/objects/${fileName}`
    const config = {
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8',
        "Authorization": `Bearer ${this.getToken()}`,
        "Content-Length": fileLength
      }
    }
    const promise = this.http.put(url, file, config).toPromise();
    await promise.then(function (response: any) {
      // console.log(response)
      localStorage.setItem(TOKEN_KEY, response.access_token)
      // console.log(response);
    }).catch(function (error) {
      // console.log(error);
    });

  }
}
