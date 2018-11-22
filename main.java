package prueba;
import java.util.ArrayList;
import java.util.Scanner;

public class main{

     public static void main(String []args){
    	 	String[] arr =new String[7];
    	 	arr[0]= "hola";
    	 	arr[1]= "hola2";
    	 	arr[2]= "hola3";
    	 	arr[3]= "hola4";
    	 	arr[4]= "hola5";
    	 	arr[5]= "hola6";
    	 	arr[6]= "hola7";
    	 	int size = 2;
    	 	String[][] R =  divideArray(arr,size);
    	    for( int p=0;p< R.length;p++){
    	    	for(int h=0;h<R[p].length;h++){
    	    		
    	    		System.out.println(R[p][h]);
    	    	}
    	    	System.out.println("Fin");
    	    }
			

    	    System.out.println("________________________________");
    	    Capicua(1001);
    	    Capicua(11);
    	    Capicua(100);
    	    Capicua(2);
    	    System.out.println("________________________________");
    	    System.out.println("1 ? "+IsPrime(1));
    	    System.out.println("19 ? "+IsPrime(19));
    	    System.out.println("10 ? "+IsPrime(10));
    	    System.out.println("5 ? "+IsPrime(5));
    	    System.out.println("3 ? "+ IsPrime(3));
    	    System.out.println("100 ? "+ IsPrime(100));
    	    System.out.println("200 ? "+ IsPrime(200));

    	    System.out.println("________________________________");
    	    multiplos();
    	
    	    
     }
     
     public static  String[][] divideArray(String[] arr,int size){
		    
		int largo = Math.round(arr.length/size)+1; 
        String[][] result = new String[largo][size] ;
        int cantArrat=0;
        //recoro el arreglo original 
        int i=0;
        while (i< arr.length){
            //creo arreglo aux para armar un arreglo de tamaño size
            String[] Auxarr = new String[size];
            int j=0;
            while(j<size && i <arr.length){
                Auxarr[j]=arr[i];
                i++;//salteo las posiciones que ya guarde
                j++;
            }
            result[cantArrat] = Auxarr;
            cantArrat++;//cuenta la cantidad de arreglos que voy ingresando para saber donde ingresar el nuevo arrayaux
           
        }
	    return result;
	}
      
     public static void Capicua(int Num){
	     if (Num >= 10){
	         //tengo que invertir el numero y si es igual al original es capucua
	         // para invertir uso mod 10 para ir sacando los digitos
	         //y dividiendo entre 10 para disminuir el numaux hasta que sea 0
	         int NumAux = Num;
	         int ultidigito =0;
	         int NumInvertido = 0;
	         while(NumAux!=0){
	             ultidigito = NumAux % 10;
	             //para agrear un 0 al final del numero multiplico por 10
	             NumInvertido = NumInvertido * 10 + ultidigito;
	             NumAux = NumAux / 10;
	         }
	         //si el invertido igual al original 
	         if ( NumInvertido == Num){
	             System.out.println("Es capicua");
	         }else{
	             System.out.println("No es capicua");
	         }
	     }else{
	         //si es de un digito no puede ser capicua
	         System.out.println("No es capicua");
	     }
     
     }
     
     public static boolean IsPrime(int Num){
	    //para ver si es primo tengo que ver si es divisible solo por el mismo y por 1
	    boolean Resultado=true ;
	    for (int i=2;i<Num;i++){
	        if ( Num % i == 0 ){
	            Resultado = false;
	        }
	    }
	    return Resultado;
    	    
    }
     
     public static void multiplos(){
    	int i=1;
	    for (i=1; i<=100; i++){
	    	
	        if ( ((i % 3) == 0) && ((i % 2) != 0) ){//si es multiplio de 3 y no de 2 
	           System.out.println("Fizz");
	        }
	        if ( ((i % 2) == 0) && ((i % 3) != 0) ){//si es multiplo de 2 y  no de 3
	            System.out.println("Buzz");
	        }
	        if ( ((i % 2) == 0) && ((i % 3) == 0) ){//si es multiplo de 2 y de 3
	            System.out.println("FizzBuzz");
	        }
	    }
    }
     
}