function Secure(){
	
    var state=new array(4);
    var count=new array(2);
    count[0]=0;
    count[1]=0;
    var buffer=new array(64);
    var transformBuffer=new array(16);
    var digestBits=new array(16);
    var S11=7;
    var S12=12;
    var S13=17;
    var S14=22;
    var S21=5;
    var S22=9;
    var S23=14;
    var S24=20;
    var S31=4;
    var S32=11;
    var S33=16;
    var S34=23;
    var S41=6;
    var S42=10;
    var S43=15;
    var S44=21;
    var ascii="01234567890123456789012345678901 !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    
	function array(n){
		for(i=0;i<n;i++){
			this[i]=0;
		}
		this.length=n;
	}
	
	this.integer=function(n){
		return n%(0xffffffff+1);
	};
	
	this.shr=function(a,b){
		a=this.integer(a);
		b=this.integer(b);
		if(a-0x80000000>=0){
			a=a%0x80000000;
			a>>=b;
			a+=0x40000000>>(b-1);
		} 
		else{
			a>>=b;
		}		
		return a;
	};
	
	this.shl1=function(a){
		a=a%0x80000000;
		if(a&0x40000000==0x40000000){
			a-=0x40000000;
			a*=2;
			a+=0x80000000;
		}
		else{
			a*=2;
		}	    
		return a;
	};
	
	 this.shl=function(a,b){
		a=this.integer(a);
		b=this.integer(b);
		for(var i=0;i<b;i++){
			a=this.shl1(a);
		}
		return a;
	};
	
	this.and=function(a,b){
		a=this.integer(a);
		b=this.integer(b);
		var t1=(a-0x80000000);
		var t2=(b-0x80000000);
		if(t1>=0){
			return (t2>=0)?((t1&t2)+0x80000000):(t1&b);
		}
		else{
			return (t2>=0)?(a&t2):(a&b);
		}
	};
	
	this.or=function(a,b){
		a=this.integer(a);
		b=this.integer(b);
		var t1=(a-0x80000000);
		var t2=(b-0x80000000);
		if(t1>=0){
			return (t2>=0)?((t1|t2)+0x80000000):((t1|b)+0x80000000);
		}
		else{
			return (t2>=0)?((a|t2)+0x80000000):(a|b);
		}
	};
	
	this.xor=function(a,b){
		a=this.integer(a);
		b=this.integer(b);
		var t1=(a-0x80000000);
		var t2=(b-0x80000000);
		if(t1>=0){
			return (t2>=0)?(t1^t2):((t1^b)+0x80000000);
		}
		else{
			return (t2>=0)?((a^t2)+0x80000000):(a^b);
		}
	};
	
	this.not=function(a){
		return (0xffffffff-this.integer(a));
	};
	
    this.F=function(x,y,z){
        return this.or(this.and(x,y),this.and(this.not(x),z));
    };
    
    this.G=function(x,y,z){
        return this.or(this.and(x,z),this.and(y,this.not(z)));
    };
    
    this.H=function(x,y,z){
        return this.xor(this.xor(x,y),z);
    };
    
    this.I=function(x,y,z){
        return this.xor(y ,this.or(x ,this.not(z)));
    };
    this.rotateLeft=function(a,n){
        return this.or(this.shl(a,n),(this.shr(a,(32 - n))));
    };
    this.FF=function(a,b,c,d,x,s,ac){
        a=a+this.F(b,c,d)+x+ac;
        a=this.rotateLeft(a,s);
        a=a+b;
        return a;
    };   
    this.GG=function(a,b,c,d,x,s,ac){
        a=a+this.G(b,c,d)+x+ac;
        a=this.rotateLeft(a,s);
        a=a+b;
        return a;
    }; 
    this.HH=function(a,b,c,d,x,s,ac){
        a=a+this.H(b,c,d)+x+ac;
        a=this.rotateLeft(a,s);
        a=a+b;
        return a;
    };
    this.II=function(a,b,c,d,x,s,ac){
        a=a+this.I(b,c,d)+x+ac;
        a=this.rotateLeft(a,s);
        a=a+b;
        return a;
    };
    this.transform=function(buf,offset){
        var a=0,b=0,c=0,d=0;
        var x=transformBuffer;
        a=state[0];
        b=state[1];
        c=state[2];
        d=state[3];
        for (i=0;i<16;i++){
            x[i]=this.and(buf[i*4+offset],0xff);
            for (j=1;j<4;j++){
                x[i]+=this.shl(this.and(buf[i*4+j+offset] ,0xff),j*8);
            }
        }
        /* tour 1 */
        a=this.FF(a,b,c,d,x[0],S11,0xd76aa478); /* 1 */
        d=this.FF(d,a,b,c,x[1],S12,0xe8c7b756); /* 2 */
        c=this.FF(c,d,a,b,x[2],S13,0x242070db); /* 3 */
        b=this.FF(b,c,d,a,x[3],S14,0xc1bdceee); /* 4 */
        a=this.FF(a,b,c,d,x[4],S11,0xf57c0faf); /* 5 */
        d=this.FF(d,a,b,c,x[5],S12,0x4787c62a); /* 6 */
        c=this.FF(c,d,a,b,x[6],S13,0xa8304613); /* 7 */
        b=this.FF(b,c,d,a,x[7],S14,0xfd469501); /* 8 */
        a=this.FF(a,b,c,d,x[8],S11,0x698098d8); /* 9 */
        d=this.FF(d,a,b,c,x[9],S12,0x8b44f7af); /* 10 */
        c=this.FF(c,d,a,b,x[10],S13,0xffff5bb1); /* 11 */
        b=this.FF(b,c,d,a,x[11],S14,0x895cd7be); /* 12 */
        a=this.FF(a,b,c,d,x[12],S11,0x6b901122); /* 13 */
        d=this.FF(d,a,b,c,x[13],S12,0xfd987193); /* 14 */
        c=this.FF(c,d,a,b,x[14],S13,0xa679438e); /* 15 */
        b=this.FF(b,c,d,a,x[15],S14,0x49b40821); /* 16 */
        /* tour 2 */
        a=this.GG(a,b,c,d,x[1],S21,0xf61e2562); /* 17 */
        d=this.GG(d,a,b,c,x[6],S22,0xc040b340); /* 18 */
        c=this.GG(c,d,a,b,x[11],S23,0x265e5a51); /* 19 */
        b=this.GG(b,c,d,a,x[0],S24,0xe9b6c7aa); /* 20 */
        a=this.GG(a,b,c,d,x[5],S21,0xd62f105d); /* 21 */
        d=this.GG(d,a,b,c,x[10],S22,0x2441453); /* 22 */
        c=this.GG(c,d,a,b,x[15],S23,0xd8a1e681); /* 23 */
        b=this.GG(b,c,d,a,x[4],S24,0xe7d3fbc8); /* 24 */
        a=this.GG(a,b,c,d,x[9],S21,0x21e1cde6); /* 25 */
        d=this.GG(d,a,b,c,x[14],S22,0xc33707d6); /* 26 */
        c=this.GG(c,d,a,b,x[3],S23,0xf4d50d87); /* 27 */
        b=this.GG(b,c,d,a,x[8],S24,0x455a14ed); /* 28 */
        a=this.GG(a,b,c,d,x[13],S21,0xa9e3e905); /* 29 */
        d=this.GG(d,a,b,c,x[2],S22,0xfcefa3f8); /* 30 */
        c=this.GG(c,d,a,b,x[7],S23,0x676f02d9); /* 31 */
        b=this.GG(b,c,d,a,x[12],S24,0x8d2a4c8a); /* 32 */
        /* tour 3 */
        a=this.HH(a,b,c,d,x[5],S31,0xfffa3942); /* 33 */
        d=this.HH(d,a,b,c,x[8],S32,0x8771f681); /* 34 */
        c=this.HH(c,d,a,b,x[11],S33,0x6d9d6122); /* 35 */
        b=this.HH(b,c,d,a,x[14],S34,0xfde5380c); /* 36 */
        a=this.HH(a,b,c,d,x[1],S31,0xa4beea44); /* 37 */
        d=this.HH(d,a,b,c,x[4],S32,0x4bdecfa9); /* 38 */
        c=this.HH(c,d,a,b,x[7],S33,0xf6bb4b60); /* 39 */
        b=this.HH(b,c,d,a,x[10],S34,0xbebfbc70); /* 40 */
        a=this.HH(a,b,c,d,x[13],S31,0x289b7ec6); /* 41 */
        d=this.HH(d,a,b,c,x[0],S32,0xeaa127fa); /* 42 */
        c=this.HH(c,d,a,b,x[3],S33,0xd4ef3085); /* 43 */
        b=this.HH(b,c,d,a,x[6],S34,0x4881d05); /* 44 */
        a=this.HH(a,b,c,d,x[9],S31,0xd9d4d039); /* 45 */
        d=this.HH(d,a,b,c,x[12],S32,0xe6db99e5); /* 46 */
        c=this.HH(c,d,a,b,x[15],S33,0x1fa27cf8); /* 47 */
        b=this.HH(b,c,d,a,x[2],S34,0xc4ac5665); /* 48 */
        /* tour 4 */
        a=this.II(a,b,c,d,x[0],S41,0xf4292244); /* 49 */
        d=this.II(d,a,b,c,x[7],S42,0x432aff97); /* 50 */
        c=this.II(c,d,a,b,x[14],S43,0xab9423a7); /* 51 */
        b=this.II(b,c,d,a,x[5],S44,0xfc93a039); /* 52 */
        a=this.II(a,b,c,d,x[12],S41,0x655b59c3); /* 53 */
        d=this.II(d,a,b,c,x[3],S42,0x8f0ccc92); /* 54 */
        c=this.II(c,d,a,b,x[10],S43,0xffeff47d); /* 55 */
        b=this.II(b,c,d,a,x[1],S44,0x85845dd1); /* 56 */
        a=this.II(a,b,c,d,x[8],S41,0x6fa87e4f); /* 57 */
        d=this.II(d,a,b,c,x[15],S42,0xfe2ce6e0); /* 58 */
        c=this.II(c,d,a,b,x[6],S43,0xa3014314); /* 59 */
        b=this.II(b,c,d,a,x[13],S44,0x4e0811a1); /* 60 */
        a=this.II(a,b,c,d,x[4],S41,0xf7537e82); /* 61 */
        d=this.II(d,a,b,c,x[11],S42,0xbd3af235); /* 62 */
        c=this.II(c,d,a,b,x[2],S43,0x2ad7d2bb); /* 63 */
        b=this.II(b,c,d,a,x[9],S44,0xeb86d391); /* 64 */
        state[0]+=a;
        state[1]+=b;
        state[2]+=c;
        state[3]+=d;
    };
    this.init=function(){
        count[0]=count[1]=0;
        state[0]=0x67452301;
        state[1]=0xefcdab89;
        state[2]=0x98badcfe;
        state[3]=0x10325476;
        for (i=0;i<digestBits.length;i++){
        	digestBits[i]=0;
        }
    };
    this.update=function(b){
        var index,i;
        index=this.and(this.shr(count[0],3),0x3f);
        if(count[0]<0xffffffff-7){
          count[0]+=8;
        }
        else{
          count[1]++;
          count[0]-=0xffffffff+1;
          count[0]+=8;
        }
        buffer[index]=this.and(b,0xff);
        if(index>=63){
            this.transform(buffer,0);
        }
    };
    this.finish=function(){
        var bits=new array(8);
        var padding;
        var i=0,index=0,padLen=0;
        for (i=0;i<4;i++){
            bits[i]=this.and(this.shr(count[0],(i*8)),0xff);
        }
        for (i=0;i<4;i++){
            bits[i+4]=this.and(this.shr(count[1],(i*8)),0xff);
        }
        index=this.and(this.shr(count[0],3),0x3f);
        padLen=(index<56)?(56 - index):(120-index);
        padding=new array(64);
        padding[0]=0x80;
        for (i=0;i<padLen;i++)
          this.update(padding[i]);
        for (i=0;i<8;i++){
        	this.update(bits[i]);
        }
        for (i=0;i<4;i++){
            for (j=0;j<4;j++){
                digestBits[i*4+j]=this.and(this.shr(state[i],(j*8)),0xff);
            }
        }
    };
    this.hexa=function(n){
    	 var hexa_h="0123456789abcdef";
    	 var hexa_c="";
    	 var hexa_m=n;
    	 for (hexa_i=0;hexa_i<8;hexa_i++){
    	   hexa_c=hexa_h.charAt(Math.abs(hexa_m)%16)+hexa_c;
    	   hexa_m=Math.floor(hexa_m/16);
    	 }
    	 return hexa_c;
    };
    this.crypte=function(message){
	    var l,s,k,ka,kb,kc,kd;
	    this.init();
	    for (k=0;k<message.length;k++){
		    l=message.charAt(k);
		    this.update(ascii.lastIndexOf(l));
	    }
	    this.finish();
	    ka=kb=kc=kd=0;
	    for (i=0;i<4;i++) ka+=this.shl(digestBits[15-i],(i*8));
	    for (i=4;i<8;i++) kb+=this.shl(digestBits[15-i],((i-4)*8));
	    for (i=8;i<12;i++) kc+=this.shl(digestBits[15-i],((i-8)*8));
	    for (i=12;i<16;i++) kd+=this.shl(digestBits[15-i],((i-12)*8));
	    s=this.hexa(kd)+this.hexa(kc)+this.hexa(kb)+this.hexa(ka);
	    return s;
    }
    
}